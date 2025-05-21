import useDialog from '@hooks/useDialog.js';
import useForm from '@hooks/useForm.js';
import generateId from '@utils/generateId.js';
import { initalizeTasksInStorage } from '@utils/localStorage.js';

import ProjectForm from '@components/ProjectForm.jsx';
import Dialog from '@ui/Dialog.jsx';
import Button from '@ui/Button.jsx';

import { projectModel } from '@data/data';

export default function ButtonAddProject({ addProject }) {
   const [isDialogOpen, openDialog, closeDialog] = useDialog();
   const [projectData, updateValue, resetForm] = useForm(projectModel);

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
