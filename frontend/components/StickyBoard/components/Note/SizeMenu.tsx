import Button from '@ui/Button';
import { SizeMIcon, SizeLIcon, SizeSIcon, SizeXLIcon } from '@assets/Icons';

import { NoteSize } from '@frontend/data/types';

type SizeMenuType = {
   editNoteSize: (size: NoteSize) => void;
   isBtnActive: (size: NoteSize) => boolean;
};

const SizeMenu = ({ editNoteSize, isBtnActive }: SizeMenuType) => {
   const sizes: NoteSize[] = ['sm', 'md', 'lg', 'xl'];
   const icons: Record<NoteSize, JSX.Element> = {
      sm: <SizeSIcon size={18} />,
      md: <SizeMIcon size={18} />,
      lg: <SizeLIcon size={18} />,
      xl: <SizeXLIcon size={18} />,
   };

   return (
      <div className="flex flex-wrap gap-1">
         {sizes.map(size => {
            if (isBtnActive('sm') && (size == 'lg' || size == 'xl')) return;
            return (
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
            );
         })}
      </div>
   );
};

export default SizeMenu;
