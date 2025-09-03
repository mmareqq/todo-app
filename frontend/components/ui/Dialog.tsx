import { useRef, useEffect } from 'react';
import useDialogContext from '@hooks/useDialogContext';

import type { Children } from '@data/types';
import Button from './Button';

type Props = {
   onCancel?: () => void;
   onSuccess?: () => void;
} & Children;

const Dialog = ({ children, onCancel, onSuccess }: Props) => {
   const { isOpen, closeDialog } = useDialogContext();
   const dialogRef = useDialogRef(isOpen, closeDialog);

   if (!isOpen) return;

   return (
      <dialog ref={dialogRef} className="dialog rounded-md">
         <div className="bg-primary-800 p-10">
            <form
               onSubmit={e => {
                  e.preventDefault();
                  onSuccess?.();

                  closeDialog();
               }}
            >
               {children}

               <menu className="mt-8 flex justify-end gap-4">
                  <Button
                     onClick={() => {
                        onCancel?.();
                        closeDialog();
                     }}
                     className="border-primary-100 shadow-primary-300/10 hover:bg-transparent"
                  >
                     Cancel
                  </Button>
                  <Button type="submit">Confirm</Button>
               </menu>
            </form>
         </div>
      </dialog>
   );
};

function useDialogRef(isOpen: boolean, closeDialog: () => void) {
   const dialogRef = useRef<HTMLDialogElement | null>(null);

   // closes and opens dialog based on isOpen flag
   useEffect(() => {
      if (!dialogRef.current) return;

      if (isOpen) dialogRef.current.showModal();
      else dialogRef.current.close();
   }, [isOpen]);

   // closes dialog if clicked outside of it
   useEffect(() => {
      if (!isOpen || !dialogRef.current) return;

      const dialogEl = dialogRef.current;
      const handleClick = (e: MouseEvent) => {
         if (e.target === dialogEl) closeDialog();
      };

      dialogEl.addEventListener('mousedown', handleClick);

      return () => {
         dialogEl.addEventListener('mousedown', handleClick);
      };
   }, [isOpen, closeDialog]);

   return dialogRef;
}

export default Dialog;
