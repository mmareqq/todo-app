import { useRef, useEffect } from 'react';
export default function Dialog({
   children,
   isOpen,
   setIsOpen,
   onCancel,
   onSuccess,
}) {
   const dialogRef = useRef(null);

   useEffect(() => {
      if (isOpen) {
         dialogRef.current?.showModal();
      } else dialogRef.current?.close();
   }, [isOpen]);

   useEffect(() => {
      if (!isOpen) return;

      const dialogClicked = e => {
         if (e.target === e.currentTarget) setIsOpen(false);
      };

      dialogRef.current?.addEventListener('click', dialogClicked);

      return () => {
         dialogRef.current?.removeEventListener('click', dialogClicked);
      };
   }, [isOpen, setIsOpen]);

   return (
      <dialog ref={dialogRef} className="dialog rounded-md">
         <div className="bg-[#111] p-10">
            {children}

            <menu className="mt-8 flex justify-end gap-2">
               <button
                  type="button"
                  className="border-inset rounded-md px-4 py-1"
                  onClick={() => {
                     onCancel?.();
                     setIsOpen(false);
                  }}
               >
                  Cancel
               </button>
               <button
                  type="button"
                  className="rounded-md bg-green-800 px-4 py-1"
                  onClick={() => {
                     onSuccess?.();
                     setIsOpen(false);
                  }}
               >
                  Save changes
               </button>
            </menu>
         </div>
      </dialog>
   );
}
