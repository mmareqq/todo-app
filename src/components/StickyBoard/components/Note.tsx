import { useRef, useState, useEffect, useCallback } from 'react';
import { DragIcon } from '@assets/Icons';
import { assertDivEl } from '@utils/assert';
import type { Note } from '@data/types';
import useStrictRef from '@hooks/useStrictRef';

type Props = {
   note: Note;
   editNote: (newNote: Note) => void;
   removeNote: (id: Note['id']) => void;
};

const Note = ({ note, editNote, removeNote }: Props) => {
   const { noteRef, dragging, handleMouseDown } = useNoteDrag(note, editNote);

   return (
      <div
         ref={noteRef}
         className="bg-primary-800 rounded-sm border p-1 select-none"
         style={{
            position: 'absolute',
            borderColor: note.color,
            height: note.height + 'px',
            width: note.width + 'px',
            boxShadow: dragging ? '0 0 1.25rem #333' : '',
            transition: 'box-shadow .1s ease-out',
            left: note.x,
            top: note.y,
         }}
      >
         <div className="flex gap-2">
            <div
               data-type="note-grab"
               className="cursor-grab active:cursor-grabbing"
               onMouseDown={handleMouseDown}
            >
               <DragIcon
                  className="pointer-events-none text-white/70"
                  size={14}
               />
            </div>
            <h2>{note.title}</h2>
         </div>
         <p className="text-sm text-white/70">{note.description}</p>
      </div>
   );
};

const useDragState = () => {
   const [dragging, setDragging] = useState(false);

   const stopDrag = () => setDragging(false);
   const startDrag = () => setDragging(true);

   return [dragging, stopDrag, startDrag] as const;
};

const useNoteDrag = (note: Note, editNote: Props['editNote']) => {
   const offsetRef = useRef({ x: 0, y: 0, startX: 0, startY: 0 });
   const offsets = offsetRef.current;
   const [dragging, stopDrag, startDrag] = useDragState();

   const [noteRef, getNoteEl] = useStrictRef<HTMLDivElement>();
   const getBoardEl = () => {
      const boardEl = getNoteEl().parentElement;
      assertDivEl(boardEl);
      if (boardEl.dataset.type !== 'sticky-board') {
         throw new Error('Expected sticky-board el');
      }
      return boardEl;
   };

   const onMouseUp = () => {
      stopDrag();
      const noteEl = getNoteEl();
      editNote({ ...note, x: noteEl.offsetLeft, y: noteEl.offsetTop });
   };

   // document event listeners
   useEffect(() => {
      if (!dragging) return;
      document.addEventListener('mousemove', moveElement);
      document.addEventListener('mouseup', onMouseUp);

      return () => {
         document.removeEventListener('mousemove', moveElement);
         document.removeEventListener('mouseup', onMouseUp);
      };
   }, [dragging]);

   const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      startDrag();
      offsets.startX = e.clientX;
      offsets.startY = e.clientY;
   };

   const moveElement = (e: MouseEvent) => {
      updateOffsets(e.clientX, e.clientY);

      const newOffset = getNewOffset();
      placeNote(newOffset.left, newOffset.top);
   };

   const placeNote = (x: number, y: number) => {
      const noteEl = getNoteEl();
      noteEl.style.left = x + 'px';
      noteEl.style.top = y + 'px';
   };

   const updateOffsets = (mouseX: number, mouseY: number) => {
      // calculate mouse move
      offsets.x = offsets.startX - mouseX;
      offsets.y = offsets.startY - mouseY;

      // update start pos to curr mouse pos
      offsets.startX = mouseX;
      offsets.startY = mouseY;
   };

   const getNewOffset = () => {
      const noteEl = getNoteEl();

      // new offset adjusted with the place of where mouse grabbed the noteEl
      const left = noteEl.offsetLeft - offsets.x;
      const top = noteEl.offsetTop - offsets.y;

      const [newLeft, newTop] = getOffsetInBound(left, top);
      if (left !== newLeft || top !== newTop) addBorderAnimation();

      return { left: newLeft, top: newTop };
   };

   // Adjust offset if outside of board
   const getOffsetInBound = (left: number, top: number) => {
      const boardEl = getBoardEl();
      const noteEl = getNoteEl();

      // screen borders
      const borderWidth = 4;

      const minLeft = borderWidth;
      const minTop = borderWidth;

      const maxTop =
         boardEl.offsetHeight - noteEl.offsetHeight + offsets.y - borderWidth;
      const maxLeft =
         boardEl.offsetWidth - noteEl.offsetWidth + offsets.x - borderWidth;

      if (left < minLeft) left = minLeft;
      if (top < minTop) top = minTop;
      if (left > maxLeft) left = maxLeft;
      if (top > maxTop) top = maxTop;

      return [left, top];
   };

   const addBorderAnimation = () => {
      const boardEl = getBoardEl();
      boardEl.addEventListener('animationend', removeBorderAnimation);
      boardEl.classList.add('bound-animation');
   };

   const removeBorderAnimation = () => {
      const boardEl = getBoardEl();
      boardEl.classList.remove('bound-animation');
      boardEl.removeEventListener('animationend', removeBorderAnimation);
   };

   useEffect(() => {
      placeNote(note.x, note.y);
   }, []);

   return { noteRef, dragging, handleMouseDown };
};

export default Note;
