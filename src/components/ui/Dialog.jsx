import { useRef, useEffect } from 'react';
export default function Dialog({
   children,
   isOpen,
   closeDialog,
   onCancel,
   onSuccess,
}) {
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

               <menu className="mt-8 flex justify-end gap-2">
                  <button
                     type="button"
                     className="shadow-primary-100/10 transiton-all border-primary-100 rounded-md border-1 px-10 py-1 duration-300 hover:shadow-lg"
                     onClick={() => {
                        onCancel?.();
                        closeDialog();
                     }}
                  >
                     Cancel
                  </button>
                  <button
                     type="submit"
                     className="shadow-accent-700/10 hover:bg-accent-700 border-accent-700 transiton-all rounded-md border-1 px-10 py-1 duration-300 hover:shadow-lg"
                  >
                     Confirm
                  </button>
               </menu>
            </form>
         </div>
      </dialog>
   );
}

function useDialogRef(isOpen, closeDialog) {
   const dialogRef = useRef(null);

   // closes and opens dialog
   useEffect(() => {
      if (isOpen) {
         dialogRef.current?.showModal();
      } else dialogRef.current?.close();
   }, [isOpen]);

   // closes dialog if clicked outside of it
   useEffect(() => {
      if (!isOpen) return;
      const dialogEl = dialogRef.current;

      const handleClick = e => {
         if (e.target === dialogEl) closeDialog();
      };

      dialogEl.addEventListener('mousedown', handleClick);

      return () => {
         dialogEl.addEventListener('mousedown', handleClick);
      };
   }, [isOpen, closeDialog]);

   return dialogRef;
}
