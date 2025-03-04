import { useRef, useEffect } from 'react';
export default function Dialog({
   children,
   isOpen,
   closeDialog,
   onCancel,
   onSuccess,
}) {
   const dialogRef = useDialogRef(isOpen, closeDialog);

   return (
      <dialog ref={dialogRef} className="dialog rounded-md">
         <div className="bg-primary-800 p-10">
            <form
               onSubmit={e => {
                  e.preventDefault();
                  onSuccess?.();
                  closeDialog();
                  console.log('dialog closed');
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

   useEffect(() => {
      if (isOpen) {
         dialogRef.current?.showModal();
      } else dialogRef.current?.close();
   }, [isOpen]);

   useEffect(() => {
      if (!isOpen) return;

      const dialogClicked = e => {
         if (e.target === e.currentTarget) closeDialog();
      };

      dialogRef.current?.addEventListener('click', dialogClicked);

      return () => {
         dialogRef.current?.removeEventListener('click', dialogClicked);
      };
   }, [isOpen, closeDialog]);

   return dialogRef;
}
