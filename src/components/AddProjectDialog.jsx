import useDialogContext from '@hooks/useDialogContext';
import useForm from '@hooks/useForm';
import { initalizeTasksInStorage } from '@utils/localStorage';
import generateId from '@utils/generateId';

import ProjectForm from './ProjectForm';
import Dialog from '@ui/Dialog';
import { projectModel } from '@data/data';

function AddProjectDialog({ addProject }) {
   const { isOpen, closeDialog } = useDialogContext();
   const [projectData, updateValue, resetForm] = useForm(projectModel);

   return (
      <Dialog
         isOpen={isOpen}
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
   );
}

export default AddProjectDialog;
