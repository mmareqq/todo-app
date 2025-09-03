import type { NoteColor } from '@data/types';
import { noteColors } from '@data/data';

type ColorPickerType = {
   selectedColor: NoteColor;
   editNoteColor: (color: NoteColor) => void;
};

const ColorPicker = ({ selectedColor, editNoteColor }: ColorPickerType) => {
   const colorKeys = Object.keys(noteColors) as NoteColor[];
   return (
      <div className="m-1 flex gap-1">
         {colorKeys.map(color => {
            const colorHEX = noteColors[color];
            const active = selectedColor === color;
            return (
               <div key={color}>
                  <label htmlFor={color} className="group">
                     <input
                        type="radio"
                        name="color"
                        className="sr-only"
                        id={color}
                        checked={active}
                        onChange={() => editNoteColor(color)}
                     />
                     <div
                        style={{
                           backgroundColor: colorHEX,
                        }}
                        className="aspect-square w-3.5 cursor-pointer rounded-full transition-transform group-has-focus-within:scale-115 hover:scale-115"
                     />
                  </label>
               </div>
            );
         })}
      </div>
   );
};

export default ColorPicker;
