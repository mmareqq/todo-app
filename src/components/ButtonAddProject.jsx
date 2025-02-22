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
            className="bg-primary-3 mr-5 w-full rounded-md border px-4 py-1 transition-colors duration-200 hover:bg-gray-400/10"
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
