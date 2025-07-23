import type { Note } from '@data/types';
import { DragEventHandler } from 'react';

type Props = {
   note: Note;
};

const Note = ({ note }: Props) => {
   const handleDrag: DragEventHandler<HTMLDivElement> = (e) => {
      const el = e.target;
      console.log('el', el);
      console.log(e);
      // console.log('elta: ', e.target);
   };

   return (
      <div
         onClick={() => console.log('adsf')}
         onDragStart={handleDrag}
         onDrag={handleDrag}
         className="bg-primary-800 cursor-move rounded-sm border p-2 select-none active:cursor-grabbing"
         style={{
            position: 'absolute',
            top: note.y + 'px',
            left: note.x + 'px',
            borderColor: note.color,
            height: note.height + 'px',
            width: note.width + 'px',
         }}
      >
         <h2>{note.title}</h2>
         <p className="text-sm text-white/70">{note.description}</p>
      </div>
   );
};

export default Note;
