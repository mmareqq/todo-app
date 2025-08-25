import Button from '@ui/Button';
import { SizeMIcon, SizeLIcon, SizeSIcon, SizeXLIcon } from '@assets/Icons';

import { noteSizes } from '@data/data';

type NoteSizeType = keyof typeof noteSizes;

type SizeMenuType = {
   editNoteSize: (size: NoteSizeType) => void;
   isBtnActive: (size: NoteSizeType) => boolean;
};

const SizeMenu = ({ editNoteSize, isBtnActive }: SizeMenuType) => {
   return (
      <div className="flex gap-1">
         <SizeButton
            size="sm"
            onClick={() => editNoteSize('sm')}
            active={isBtnActive('sm')}
            Icon={<SizeSIcon />}
         />
         <SizeButton
            size="md"
            onClick={() => editNoteSize('md')}
            active={isBtnActive('md')}
            Icon={<SizeMIcon />}
         />
         {!isBtnActive('sm') && (
            <SizeButton
               size="lg"
               onClick={() => editNoteSize('lg')}
               active={isBtnActive('lg')}
               Icon={<SizeLIcon />}
            />
         )}
         {!isBtnActive('sm') && !isBtnActive('md') && (
            <SizeButton
               size="xl"
               onClick={() => editNoteSize('xl')}
               active={isBtnActive('xl')}
               Icon={<SizeXLIcon />}
            />
         )}
      </div>
   );
};

type SizeBtnProps = {
   size: NoteSizeType;
   onClick: () => void;
   active: boolean;
   Icon: JSX.Element;
};

const SizeButton = ({ size, onClick, active, Icon }: SizeBtnProps) => {
   return (
      <Button
         variant="glass"
         className="p-0.75"
         active={active}
         onClick={onClick}
      >
         <span className="sr-only">{size} size</span>
         {Icon}
      </Button>
   );
};

export default SizeMenu;
