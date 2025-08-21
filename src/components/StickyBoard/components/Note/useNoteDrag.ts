import { useEffect, useRef, useCallback } from 'react';
import useDragState from './useDragState';

import { animateEl } from '@utils/animate';
import type { NoteActions, Note } from '@data/types';

const BORDER_WIDTH = 7; // space from the edge of the board
const BOARD_WIDTH = 1800;
const useNoteDrag = (note: Note, editNote: NoteActions['editNote']) => {
   const positionRef = useRef({ startX: 0, startY: 0, deltaX: 0, deltaY: 0 });
   const [dragging, stopDrag, startDrag] = useDragState();
   const { getNoteEl, getBoardEl, noteRef } = useNoteAndBoardRefs();

   const moveNote = useCallback(
      (x: number, y: number) => {
         const noteEl = getNoteEl();
         noteEl.style.left = x + 'px';
         noteEl.style.top = y + 'px';
      },
      [getNoteEl],
   );

   const clampToBoard = useCallback(
      (left: number, top: number) => {
         const noteEl = getNoteEl();

         const minLeft = BORDER_WIDTH;
         const maxLeft = BOARD_WIDTH - BORDER_WIDTH;
         const minTop = BORDER_WIDTH;
         const maxTop = getBoardEl().offsetHeight - BORDER_WIDTH;

         const newLeft =
            Math.min(Math.max(left, minLeft) + noteEl.offsetWidth, maxLeft) -
            noteEl.offsetWidth;
         const newTop =
            Math.min(Math.max(top, minTop) + noteEl.offsetHeight, maxTop) -
            noteEl.offsetHeight;

         return [newLeft, newTop];
      },
      [getNoteEl, getBoardEl],
   );

   const calculateNewPos = useCallback(() => {
      const noteEl = getNoteEl();
      const left = noteEl.offsetLeft - positionRef.current.deltaX;
      const top = noteEl.offsetTop - positionRef.current.deltaY;

      const [newLeft, newTop] = clampToBoard(left, top);

      if (left !== newLeft || top !== newTop) {
         // animate border if offset was adjusted
         animateEl(getBoardEl(), 'bound-animation');
      }

      return { left: newLeft, top: newTop };
   }, [getBoardEl, getNoteEl, clampToBoard]);

   useEffect(() => {
      moveNote(note.x, note.y);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   // move note where the mouse is
   const onMouseMove = useCallback(
      (e: MouseEvent) => {
         updateOffsets(e.clientX, e.clientY);

         const newOffset = calculateNewPos();
         moveNote(newOffset.left, newOffset.top);
      },
      [calculateNewPos, moveNote],
   );

   const updateOffsets = (mouseX: number, mouseY: number) => {
      const pos = positionRef.current;
      // delta from previous pos
      pos.deltaX = pos.startX - mouseX;
      pos.deltaY = pos.startY - mouseY;

      pos.startX = mouseX;
      pos.startY = mouseY;
   };

   const initalizeDrag = useCallback(
      (e: MouseEvent) => {
         startDrag();
         updateOffsets(e.clientX, e.clientY);
      },
      [startDrag],
   );

   const finishDrag = useCallback(() => {
      stopDrag();
      const noteEl = getNoteEl();
      noteEl.scrollIntoView({ behavior: 'smooth' });
      editNote({ ...note, x: noteEl.offsetLeft, y: noteEl.offsetTop });
   }, [editNote, getNoteEl, note, stopDrag]);

   // event listeners
   useEffect(() => {
      const dragArea = getNoteEl().querySelector(
         '[data-type="drag-area"]',
      ) as HTMLElement;
      if (!dragArea) throwElError('note drag area');

      dragArea.addEventListener('mousedown', initalizeDrag);
      return () => {
         dragArea.removeEventListener('mousedown', initalizeDrag);
      };
   }, [getNoteEl, initalizeDrag]);

   useEffect(() => {
      if (!dragging) return;
      const boardEl = getBoardEl();
      boardEl.addEventListener('mousemove', onMouseMove);
      boardEl.addEventListener('mouseup', finishDrag);
      boardEl.addEventListener('mouseleave', finishDrag);

      return () => {
         boardEl.removeEventListener('mousemove', onMouseMove);
         boardEl.removeEventListener('mouseup', finishDrag);
         boardEl.removeEventListener('mouseleave', finishDrag);
      };
   }, [dragging, getBoardEl, finishDrag, onMouseMove]);

   return { noteRef, dragging };
};

const useNoteAndBoardRefs = () => {
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

   return { getNoteEl, getBoardEl, noteRef, boardRef };
};

const throwElError = (name: string): never => {
   throw new Error(`Tried to access ${name} element that doesn't exist`);
};

export default useNoteDrag;
