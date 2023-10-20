import { Injectable, Logger } from '@nestjs/common';
import { ComponentWithLogging } from '~utils/logging';
import { Note, NoteUpdateArgs } from 'prisma';
import { CreateNoteDto, UpdateNoteDto } from '~note/dto/note.dto';
import { DatabaseService } from '~persistence/prisma/database.service';
import { DetachedNote, NoteStatus } from '#interfaces/notes/notes.interface';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { Prisma } from '@prisma/client';
import { villains } from '../../../constants';

@Injectable()
export class NoteDatabaseService extends ComponentWithLogging {
  constructor(
    private readonly db: DatabaseService,
    private readonly logger: Logger,
  ) {
    super();

    this.setLogs({
      debug: (...args: any) => logger.debug(args),
      error: (...args: any) => logger.error(args),
      log: (...args: any) => logger.log(args),
      warn: (...args: any) => logger.warn(args),
      verbose: (...args: any) => logger.verbose(args),
    });
  }

  async list(userId: string): Promise<Note[]> {
    if (!userId) {
      this.report('No user id provided for list notes', HttpStatus.BAD_REQUEST);
    }

    try {
      return this.db.note.findMany({
        where: {
          userId,
          status: NoteStatus.active,
        },
      });
    } catch (err: any) {
      this.report('Failed to list notes', err);
    }
  }

  get(id: string, userId: string): Promise<Note> {
    if (!id) {
      this.report('No note id provided for get note', HttpStatus.BAD_REQUEST);
    }
    if (!userId) {
      this.report('No user id provided for get note', HttpStatus.BAD_REQUEST);
    }

    try {
      return this.db.note.findUnique({ where: { id, userId } });
    } catch (err: any) {
      this.report('Failed to get note', err);
    }
  }

  async create({
    userId,
    title,
    content,
    parentId = null,
    next = null,
  }: CreateNoteDto): Promise<Note> {
    if (!userId) {
      this.report(
        'No user id provided for create note',
        HttpStatus.BAD_REQUEST,
      );
    }

    const query: Prisma.NoteCreateInput = {
      title,
      content,
      status: NoteStatus.active,
      User: {
        connect: {
          id: userId,
        },
      },
    };

    if (parentId) {
      query.Parent = {
        connect: {
          id: parentId,
        },
      };
    }

    if (next) {
      query.Next = {
        connect: {
          id: next,
        },
      };
    } else {
      let lastNode: Note;
      try {
        lastNode = await this.db.note.findFirst({
          select: { id: true },
          where: {
            parentId: parentId,
            next: null,
            userId,
            status: NoteStatus.active,
          },
        });
      } catch (err: any) {
        this.report(
          `Failed to retrieve final root node for user: ${userId} (used for note creation) (1)`,
          err,
        );
      }
      if (lastNode) {
        query.Prev = {
          connect: {
            id: lastNode.id,
          },
        };
      }
    }

    try {
      return await this.db.note.create({ data: query });
    } catch (err: any) {
      this.report('Failed to create note', err);
    }
  }

  update({
    id,
    userId,
    title,
    content,
    head,
    next,
    status,
  }: UpdateNoteDto): Promise<Note> {
    if (!id) {
      this.report(
        'No note id provided for update note',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!userId) {
      this.report(
        'No user id provided for update note',
        HttpStatus.BAD_REQUEST,
      );
    }
    const query: NoteUpdateArgs = {
      where: {
        id,
        userId,
      },
      data: {},
    };

    if (!title && !content && !status && !head && !next) {
      this.report('Cannot Update Note: No fields to Update');
    }

    if (title) {
      query.data.title = title;
    }
    if (content) {
      query.data.content = content;
    }
    if (status) {
      query.data.status = status;
    }
    if (head) {
      query.data.head = head;
    }
    if (next) {
      query.data.next = next;
    }

    try {
      return this.db.note.update(query);
    } catch (err: any) {
      this.report('Failed to update note', err);
    }
  }

  /**
   * identifies if a node is the ancestor of another. Useful for avoiding things like infinite ancestor loops
   * @param userId - string: user which owns the note tree
   * @param descendant - string: id of descendant node
   * @param ancestor - string: id of potential ancestor
   */
  async isAncestor(
    userId: string,
    descendant: string,
    ancestor: string,
  ): Promise<boolean> {
    if (!userId) {
      this.report('No user id provided for list notes', HttpStatus.BAD_REQUEST);
    }

    try {
      const result = await this.db.$queryRaw`
          WITH RECURSIVE noteTree(id, parentId) AS (
              SELECT descendant."id",  descendant."parentId"
              FROM "Note" descendant
              WHERE descendant."userId" = ${userId}
                AND descendant."id" = ${descendant}
              UNION ALL
                SELECT ancestor."id", ancestor."parentId"
                FROM "Note" ancestor
                INNER JOIN noteTree ON ancestor."id" = noteTree."parentid"
                WHERE ancestor."userId" = ${userId}
          )
          SELECT COUNT(id)
          FROM noteTree result
          WHERE result."id" = ${ancestor};`;

      return Number(result[0].count) !== 0;
    } catch (err: any) {
      this.report('Failed to list notes', err);
    }
  }

  /**
   * Remove a note from its current position and return an object which can be used to reattach the note
   * @param note - Note: The note being detatched from the NoteTree.
   * @param userId - string: user which owns the note tree
   * @param markDeleted - boolean: if true, the detached note is also marked as deleted
   *    note.status = DELETED
   * @return originalSibling - Note: the updated Sibling and the original 'next' property of the sibling
   *    so the detachment can be reverted.
   *
   *  Find Note [A]: where A.next === note
   *    If A: A.next = note.next
   */
  async detachNote(
    note: Note,
    userId: string,
    markDeleted: boolean = false,
  ): Promise<DetachedNote> {
    const originalParent = note.parentId;
    let sibling: Note | undefined;

    try {
      sibling = await this.db.note.findUnique({
        where: { next: note.id, userId },
      });
    } catch (err: any) {
      this.report('Failed to detach note, could not search for sibling.', err);
    }

    if (sibling?.id) {
      try {
        const newSiblingNextPointer: Prisma.NoteUpdateOneWithoutPrevNestedInput =
          note.next
            ? {
                connect: {
                  id: note.next,
                },
              }
            : {
                disconnect: true,
              };

        sibling = await this.db.note.update({
          where: { id: sibling.id, userId },
          data: {
            Next: newSiblingNextPointer,
          },
        });
      } catch (err: any) {
        this.report('Failed to detach note from sibling.', err);
      }
    }

    if (note.parentId || markDeleted) {
      try {
        const query: Prisma.NoteUpdateArgs = {
          where: { id: note.id, userId },
          data: {},
        };

        if (note.parentId) {
          query.data.Parent = {
            disconnect: {
              id: note.parentId,
            },
          };
        }

        if (markDeleted) {
          query.data.status = NoteStatus.deleted;
        }
        await this.db.note.update(query);
      } catch (err: any) {
        this.report('Failed to detach note from parent.', err);
      }
    }

    return {
      noteId: note.id as string,
      sibling,
      originalNext: note.id,
      originalParent,
      userId,
    };
  }

  /** Undo operation done by detachNote function in this service */
  async detachNote_Revert({
    noteId,
    originalParent,
    originalNext,
    sibling,
    userId,
  }: DetachedNote) {
    try {
      await this.db.note.update({
        where: { userId, id: sibling.id },
        data: { next: originalNext },
      });
    } catch (err: any) {
      this.error(
        "Failed to revert target's previous sibling's \"next\" property. Consolidating User's Note Tree",
        err,
      );
      await this.consolidateTree(userId);
    }
    try {
      const noteRecord = await this.db.note.findUnique({
        where: { userId, id: noteId },
      });
      if (noteRecord && noteRecord.parentId !== originalParent) {
        this.db.note.update({
          where: { userId, id: noteId },
          data: { next: originalNext },
        });
      }
    } catch (err: any) {
      this.error(
        "Failed to revert target's previous sibling's \"next\" property. Consolidating User's Note Tree",
        err,
      );
      await this.consolidateTree(userId);
    }
  }

  /**
   * Use when a user's tree is suspected to have nodes that are not strongly linked.
   * Moved any loose notes out of their current position and into the last nodes in the user's root nodes
   * @param userId - ID of User whose tree is being investigated
   * @param attempt - Due to critical nature of this fallback function, it will attempt to run up to 3 times in case of
   *    error
   */
  async consolidateTree(userId: string, attempt: number = 0) {
    try {
      //TODO Create function to consolidate a user's note tree.
      // Function should move any out-of-tree nodes onto the root of the tree.
    } catch (err: any) {
      if (attempt < MAX_CONSOLIDATION_ATTEMPT) {
        this.error('FAILED TO CONSOLIDATE USER TREE', err);
        await this.consolidateTree(userId, attempt + 1);
      }
      this.report(
        '--CRITICAL FAILURE--\n' +
          '`CRITICAL FAILURE: UNABLE TO CONSOLIDATE USER TREE [User: ${userId}]`' +
          '\n--CRITICAL FAILURE--',
        err,
      );
    }
  }

  async addDefaultNotes(userId: string, clearCurrent: boolean = false) {
    if (clearCurrent) {
      await this.db.note.deleteMany({ where: { userId } });
    }

    const createQueries: Prisma.NoteCreateManyInput[] = [];
    for (const { content, title } of villains) {
      createQueries.push({
        title,
        content,
        userId: userId,
        status: NoteStatus.active,
      });
    }

    await this.db.note.createMany({
      data: createQueries,
    });

    const updateQueries: Prisma.NoteUpdateArgs[] = [];
    const noteList = await this.list(userId);
    for (const { title, next: nextTitle, parentId: parentTitle } of villains) {
      const relations = getRelationsForVillains(
        noteList,
        title,
        parentTitle,
        nextTitle,
      );

      if (relations) {
        const { id, next, parentId } = relations;
        if (!id) {
          continue;
        }
        const query: Prisma.NoteUpdateArgs = {
          where: {
            id,
          },
          data: {},
        };
        if (parentId) {
          query.data.Parent = {
            connect: {
              id: parentId,
            },
          };
        }
        if (next) {
          query.data.Next = {
            connect: {
              id: next,
            },
          };
        }
        updateQueries.push(query);
      }
    }

    const promises = [];
    for (const query of updateQueries) {
      promises.push(this.db.note.update(query));
    }
    await Promise.all(promises);
    return true;
  }
}

const MAX_CONSOLIDATION_ATTEMPT = 3;

const getRelationsForVillains = (
  noteList: Note[],
  title: string,
  parentTitle: string | undefined,
  nextTitle: string | undefined,
) => {
  let id: string | undefined;
  let parentId: string | undefined;
  let next: string | undefined;
  const parentFound = !parentTitle || (parentTitle && parentId);
  const nextFound = !nextTitle || (nextTitle && next);
  for (const { title: noteTitle, id: noteId } of noteList) {
    if (title === noteTitle) {
      id = noteId;
    } else if (parentTitle && noteTitle === parentTitle) {
      parentId = noteId;
    } else if (nextTitle && noteTitle === nextTitle) {
      next = noteId;
    }

    if (id && parentFound && nextFound) {
      break;
    }
  }

  if (!parentId && !next) {
    return null;
  }

  return {
    id,
    parentId,
    next,
  };
};
