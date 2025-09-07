import Button from '@ui/Button';
import { SizeMIcon, SizeLIcon, SizeSIcon, SizeXLIcon } from '@assets/Icons';

import { NoteSize } from '@data/types';

type SizeMenuType = {
   editNoteSize: (size: NoteSize) => void;
   isBtnActive: (size: NoteSize) => boolean;
};

const SizeMenu = ({ editNoteSize, isBtnActive }: SizeMenuType) => {
   const sizes: NoteSize[] = ['sm', 'md', 'lg', 'xl'];
   const icons: Record<NoteSize, JSX.Element> = {
      sm: <SizeSIcon />,
      md: <SizeMIcon />,
      lg: <SizeLIcon />,
      xl: <SizeXLIcon />,
   };

   return (
      <div className="flex gap-1">
         {sizes.map(size => (
            <Button
               key={size}
               variant="glass"
               className="p-0.75"
               active={isBtnActive(size)}
               onClick={() => editNoteSize(size)}
            >
               <span className="sr-only">{size} size</span>
               {icons[size]}
            </Button>
         ))}
      </div>
   );
};

export default SizeMenu;
