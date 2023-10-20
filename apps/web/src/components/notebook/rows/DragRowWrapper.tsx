import styles from '@components/notebook/notebook.module.scss';
import { DragWrapperHandlers } from '#interfaces/notes';
import React, { PropsWithChildren, RefObject } from 'react';
import { DraggableCore } from 'react-draggable';

interface DragRowWrapperProps extends PropsWithChildren {
  containerName: string;
  dragRef: RefObject<HTMLDivElement>;
  isDragged: boolean;
  handlers: DragWrapperHandlers;
  yOffset: number;
}
export const DragRowWrapper = ({
  containerName,
  children,
  dragRef,
  isDragged,
  handlers,
  yOffset,
}: DragRowWrapperProps) => {
  const css = isDragged ? 'text-coffee font-semibold z-50 pointer-events-none opacity-50' : '';

  return (
    <DraggableCore {...handlers} nodeRef={dragRef}>
      <div
        className={`note-row relative ${containerName} ${styles.noteRow} ${css}`}
        data-testid={containerName}
        ref={dragRef}
        style={{
          transform: `translateY(${yOffset}px)`,
        }}
      >
        {children}
      </div>
    </DraggableCore>
  );
};
