import { useRef, useState, useEffect } from 'react';
import { DragIcon } from '@assets/Icons';

import type { Note } from '@data/types';

type Props = {
   note: Note;
   editNote: (newNote: Note) => void;
   removeNote: (id: Note['id']) => void;
};

// TODO add start pos
const Note = ({ note, editNote, removeNote }: Props) => {
   const noteRef = useRef<HTMLDivElement>(null!);
   const offsetRef = useRef({ x: 0, y: 0, startX: 0, startY: 0 });
   const offsets = offsetRef.current;
   const [dragging, setDragging] = useState(false);

   const stopDrag = () => setDragging(false);
   const startDrag = () => setDragging(true);

   const onMouseUp = () => {
      stopDrag();

      const el = noteRef.current;
      editNote({ ...note, x: el.offsetLeft, y: el.offsetTop });
   };

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

      const stickyBoard = noteRef.current.parentElement!;
      stickyBoard.addEventListener('mouseleave', stopDrag);
   };

   const moveElement = (e: MouseEvent) => {
      updateOffsets({ x: e.clientX, y: e.clientY });

      const newOffset = getNewOffset();
      placeNote(newOffset.left, newOffset.top);
   };

   const placeNote = (x: number, y: number) => {
      const el = noteRef.current;
      el.style.left = x + 'px';
      el.style.top = y + 'px';
   };

   const updateOffsets = (mousePos: { x: number; y: number }) => {
      // calculate mouse move
      offsets.x = offsets.startX - mousePos.x;
      offsets.y = offsets.startY - mousePos.y;

      // update start pos to curr mouse pos
      offsets.startX = mousePos.x;
      offsets.startY = mousePos.y;
   };

   const getNewOffset = () => {
      const el = noteRef.current;

      const stickyBoard = el.parentElement;
      if (!stickyBoard) throw new Error('note has to be inside sticky board');

      // screen borders
      const borderWidth = 8;
      const maxTop =
         stickyBoard.offsetHeight - el.offsetHeight + offsets.y - borderWidth;
      const maxLeft =
         stickyBoard.offsetWidth - el.offsetWidth + offsets.x - borderWidth;

      // new offset adjusted with the place of where mouse grabbed the el
      let left = el.offsetLeft - offsets.x;
      let top = el.offsetTop - offsets.y;

      const addAnimation = () => {
         stickyBoard.addEventListener('animationend', removeAnimation);
         stickyBoard.classList.add('bound-animation');
      };

      const removeAnimation = () => {
         stickyBoard.classList.remove('bound-animation');
         stickyBoard.removeEventListener('animationend', removeAnimation);
      };

      let isOutside = false;

      if (top < 0) {
         top = 0;
         isOutside = true;
      }

      if (left < 0) {
         left = 0;
         isOutside = true;
      }

      if (top > maxTop) {
         top = maxTop;
         isOutside = true;
      }

      if (left > maxLeft) {
         left = maxLeft;
         isOutside = true;
      }

      if (isOutside) addAnimation();

      return { left, top };
   };

   useEffect(() => {
      placeNote(note.x, note.y);
   }, []);

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

export default Note;
