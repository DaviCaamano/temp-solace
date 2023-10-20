import { DeleteNoteResponse, NoteStatus } from '#interfaces/notes';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';

import { Injectable, Logger } from '@nestjs/common';
import { ComponentWithLogging } from '~utils/logging';
import { DatabaseService } from '~persistence/prisma/database.service';
import { NoteDatabaseService } from '~note/services/note-database.service';
import { Note } from 'prisma';

@Injectable()
export class NoteDeleteService extends ComponentWithLogging {
  constructor(
    private readonly db: DatabaseService,
    private readonly dbService: NoteDatabaseService,
    private readonly logger: Logger,
  ) {
    super();

    this.setLogs({
      debug: (...args: any) => logger.debug(args),
      error: (...args: any) => logger.error(args),
      log: (...args: any) => logger.log(args),
      verbose: (...args: any) => logger.verbose(args),
      warn: (...args: any) => logger.warn(args),
    });
  }

  async delete(
    id: string,
    userId: string,
    deleteChildren: boolean = false,
  ): Promise<DeleteNoteResponse> {
    if (!id) {
      this.report(
        'No note id provided for delete note',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!userId) {
      this.report(
        'No user id provided for delete note',
        HttpStatus.BAD_REQUEST,
      );
    }

    let noteList: Note | undefined;
    try {
      noteList = await this.db.note.findMany({
        where: { userId },
        include: { Children: true },
      });
    } catch (err: any) {
      this.report('Failed to get Note to be marked for Deletion (1)', err);
    }

    if (!noteList) {
      this.report('Failed to get Note to be marked for Deletion (2)');
    }

    const [target, children] = await this.getDescendants(id, noteList);

    if (!target) {
      this.report('Failed to find Note to be marked for Deletion');
    }
    const detachedNote = await this.dbService.detachNote(target, userId, true);

    if (children.length) {
      if (deleteChildren) {
        try {
          await this.db.note.updateMany({
            where: {
              OR: children.map(({ id: noteId }: Note) => ({
                id: noteId,
              })),
              AND: {
                userId,
              },
            },
            data: {
              status: NoteStatus.deleted,
            },
          });
        } catch (err: any) {
          await this.dbService.detachNote_Revert(detachedNote);
          this.report(
            `Failed to delete children of: ${target.id}, reverting detatch`,
          );
        }
      } else {
        await this.elevateChildren(target, userId, noteList);
      }
    }

    return { deleted: deleteChildren ? [target.id, ...children] : [target] };
  }

  /**
   * Get all descendants of a node
   * @param id - string:
   * @param noteList
   */
  async getDescendants(
    id: string,
    noteList: Note | undefined,
  ): Promise<[Note | undefined, Note[]]> {
    let target: Note | undefined;
    const children: Note[] = [];
    let childrenLength = 0;
    do {
      childrenLength = children.length;
      noteList = noteList.filter((note: Note) => {
        const hasChildren = !!note.Children.length;
        if (note.id === id) {
          target = note;
          if (hasChildren) {
            children.push(...note.Children);
          }
          return false;
        } else if (hasChildren && children.includes(note.id)) {
          children.push(...note.Children);
        }
      });
    } while (childrenLength !== children.length);

    return [target, children];
  }

  async elevateChildren(note: Note, userId: string, noteList: Note[]) {
    const parentId = note.parentId || null;
    const children = noteList.filter((child: Note) => {
      return child.parentId === note.id;
    });

    if (children.length) {
      /** Find the first child of the deleted note */
      const nextIds: string[] = children.map(({ next }: Note) => next);
      let firstChild: Note | undefined;
      for (const child of children) {
        if (!nextIds.includes(child.id)) {
          firstChild = child;
        }
      }

      if (!firstChild) {
        await this.dbService.consolidateTree(userId);
      }

      /** Get Last Child of deleted note's siblings */
      let lastSibling: Note | undefined;
      try {
        lastSibling = await this.db.note.findFirst({
          where: {
            parentId,
            userId,
            status: NoteStatus.active,
            Next: null,
          },
        });
      } catch (err: any) {
        this.report('Failed to get last child of deleted notes siblings', err);
      }

      if (lastSibling) {
        /**
         * Link the last element in the parent's list of children to the first element in the deleted note's
         *  list of children.
         */
        try {
          await this.db.note.update({
            where: { id: lastSibling.id },
            data: {
              Next: {
                connect: {
                  id: firstChild.id,
                },
              },
            },
          });
        } catch (err: any) {
          this.report(
            "Failed to connect parent's last child to first child of deleted note",
            err,
          );
        }
      }

      /** Set all parent ID's to that or the original parent, or null if parent was a child of root. */
      try {
        await this.db.note.updateMany({
          where: {
            OR: children.map((child: Note) => ({ id: child.id, userId })),
          },
          data: { parentId },
        });
      } catch (err: any) {
        try {
          await this.db.note.updateMany({
            where: { OR: children.map((child: Note) => ({ id: child.id })) },
            data: { parentId: note.id },
          });
        } catch (err: any) {
          this.error(
            "Failed to revert deletions evlated children. Consolidating User's Note Tree",
            err,
          );
          await this.dbService.consolidateTree(userId);
        }
        this.report('Failed to update Children of deleted note', err);
      }
    }
  }
}
