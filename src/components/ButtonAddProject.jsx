import Dialog from './Dialog.jsx';
import useDialog from '../hooks/useDialog.js';
import generateId from '../utils/generateId.js';
import { initalizeTasksInStorage } from '../utils/localStorage.js';
import ProjectForm from './ProjectForm.jsx';
import useForm from '../hooks/useForm.js';

export default function ButtonAddProject({ addProject }) {
   const [isDialogOpen, openDialog, closeDialog] = useDialog();
   const [projectData, updateValue, clearForm] = useForm({ name: '' });

   return (
      <>
         <button
            className="shadow-accent-700/10 hover:bg-accent-700 border-accent-700 transiton-all rounded-md border-1 px-10 py-1 duration-300 hover:shadow-lg"
            type="button"
            onClick={openDialog}
         >
            Add project
         </button>

         <Dialog
            isOpen={isDialogOpen}
            closeDialog={closeDialog}
            onSuccess={() => {
               const project = { id: generateId(), name: projectData.name };
               initalizeTasksInStorage(project.id);

               addProject(project);
               clearForm();
            }}
         >
            <ProjectForm project={projectData} updateValue={updateValue} />
         </Dialog>
      </>
   );
}
