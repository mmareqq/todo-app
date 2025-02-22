import { EditIcon, TrashIcon } from '../assets/Icons';

export default function EditButton({ edit, altText }) {
   // const [isDialogOpen, openDialog, closeDialog] = useDialog();
   return (
      <>
         <button
            type="button"
            className="bg-opacity-50 my-2 mr-1 rounded-md p-1 transition-colors duration-150 hover:bg-white/8"
         >
            <span className="sr-only">edit: {altText}</span>
            <EditIcon></EditIcon>
         </button>
         {/* <Dialog
            isOpen={isDialogOpen}
            closeDialog={closeDialog}
            onSuccess={edit}
         ></Dialog> */}
      </>
   );
}
