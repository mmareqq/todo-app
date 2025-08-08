import { useEffect, useRef, useCallback } from 'react';
import useDragState from './useDragState';

import { animateEl } from '@utils/animate';
import type { NoteActions, Note } from '@data/types';

const BORDER_WIDTH = 5; // space from the edge of the board

const useNoteDrag = (note: Note, editNote: NoteActions['editNote']) => {
   const positionRef = useRef({ x: 0, y: 0, startX: 0, startY: 0 });
   const [dragging, stopDrag, startDrag] = useDragState();
   const noteRef = useRef<HTMLDivElement | null>(null);
   const boardRef = useRef<HTMLDivElement | null>(null);

   // sync note and board refs
   useEffect(() => {
      if (!noteRef.current) return;
      const boardEl = noteRef.current.parentElement as HTMLDivElement;
      if (!boardEl || boardEl.dataset.type !== 'sticky-board') {
         throw new Error('No board element');
      }
      boardRef.current = boardEl;
   }, []);

   const getNoteEl = () => noteRef.current ?? throwElError('note');
   const getBoardEl = () => boardRef.current ?? throwElError('board');

   // move note where the mouse is
   const onMouseMove = useCallback((e: MouseEvent) => {
      updateOffsets(e.clientX, e.clientY);

      const newOffset = calculateNewPosition();
      placeNote(newOffset.left, newOffset.top);
   }, []);

   // save note position on drop
   const onMouseUp = useCallback(() => {
      stopDrag();
      const noteEl = getNoteEl();
      editNote({ ...note, x: noteEl.offsetLeft, y: noteEl.offsetTop });
   }, []);

   // adding event listeners
   useEffect(() => {
      if (!dragging) return;
      const boardEl = getBoardEl();
      boardEl.addEventListener('mousemove', onMouseMove);
      boardEl.addEventListener('mouseup', onMouseUp);
      boardEl.addEventListener('mouseleave', stopDrag);

      return () => {
         boardEl.removeEventListener('mousemove', onMouseMove);
         boardEl.removeEventListener('mouseup', onMouseUp);
         boardEl.removeEventListener('mouseleave', stopDrag);
      };
   }, [dragging, onMouseMove, onMouseUp, stopDrag]);

   const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      startDrag();
      positionRef.current.startX = e.clientX;
      positionRef.current.startY = e.clientY;
   };

   const placeNote = (x: number, y: number) => {
      const noteEl = getNoteEl();
      noteEl.style.left = x + 'px';
      noteEl.style.top = y + 'px';
   };

   const updateOffsets = (mouseX: number, mouseY: number) => {
      const pos = positionRef.current;
      // calculate mouse move
      pos.x = pos.startX - mouseX;
      pos.y = pos.startY - mouseY;

      // update start pos to curr mouse pos
      pos.startX = mouseX;
      pos.startY = mouseY;
   };

   const calculateNewPosition = () => {
      const noteEl = getNoteEl();

      // new offset adjusted with the place of where mouse grabbed the noteEl
      const left = noteEl.offsetLeft - positionRef.current.x;
      const top = noteEl.offsetTop - positionRef.current.y;

      const [newLeft, newTop] = getOffsetInBound(left, top);
      if (left !== newLeft || top !== newTop) {
         animateEl(getBoardEl(), 'bound-animation');
      }

      return { left: newLeft, top: newTop };
   };

   // Adjust offset if outside of board
   const getOffsetInBound = (left: number, top: number) => {
      const noteEl = getNoteEl();
      const boardEl = getBoardEl();

      const minLeft = BORDER_WIDTH;
      const maxLeft = boardEl.offsetWidth - noteEl.offsetWidth - BORDER_WIDTH;
      const minTop = BORDER_WIDTH;
      const maxTop = boardEl.offsetHeight - noteEl.offsetHeight - BORDER_WIDTH;

      const newLeft = Math.min(Math.max(left, minLeft), maxLeft);
      const newTop = Math.min(Math.max(top, minTop), maxTop);

      return [newLeft, newTop];
   };

   useEffect(() => {
      placeNote(note.x, note.y);
   }, []);

   return { noteRef, dragging, onMouseDown };
};

const throwElError = (name: string): never => {
   throw new Error(`Tried to access ${name} element that doesn't exist`);
};

export default useNoteDrag;
