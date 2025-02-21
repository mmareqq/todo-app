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
         <div className="bg-[#111] p-10">
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
                     className="border-inset rounded-md px-4 py-1"
                     onClick={() => {
                        onCancel?.();
                        closeDialog();
                     }}
                  >
                     Cancel
                  </button>
                  <button
                     type="submit"
                     className="rounded-md bg-green-800 px-4 py-1"
                  >
                     Save changes
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
