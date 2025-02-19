import { useRef } from 'react';
export default function Dialog({ isOpen }) {
   const dialogRef = useRef(null);
   if (isOpen) {
      dialogRef.current?.showModal(); // Optional chaining
   } else dialogRef.current?.close();

   function closeDialog() {
      dialogRef.current.close();
   }

   return (
      <dialog ref={dialogRef}>
         Dialog
         <button type="button" onClick={closeDialog}></button>
      </dialog>
   );
}
