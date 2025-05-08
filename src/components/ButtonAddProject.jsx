import Dialog from './Dialog.jsx';
import useDialog from '../hooks/useDialog.js';
import generateId from '../utils/generateId.js';
import { initalizeTasksInStorage } from '../utils/localStorage.js';
import ProjectForm from './ProjectForm.jsx';
import useForm from '../hooks/useForm.js';
import Button from './Button.jsx';

export default function ButtonAddProject({ addProject }) {
   const [isDialogOpen, openDialog, closeDialog] = useDialog();
   const [projectData, updateValue, resetForm] = useForm({ name: '' });

   return (
      <>
         <Button onClick={openDialog}>Add project</Button>
         <Dialog
            isOpen={isDialogOpen}
            closeDialog={closeDialog}
            onSuccess={() => {
               const project = {
                  id: generateId(),
                  name: projectData.name,
                  editable: true,
                  createdByUser: true,
               };
               initalizeTasksInStorage(project.id);
               addProject(project);
               resetForm();
            }}
         >
            <ProjectForm project={projectData} updateValue={updateValue} />
         </Dialog>
      </>
   );
}
