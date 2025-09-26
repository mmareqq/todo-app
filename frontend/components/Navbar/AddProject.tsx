import DialogProvider from '@contexts/DialogProvider';
import useDialogContext from '@hooks/useDialogContext';
import { projectModel } from '@frontend/data/data';
import useForm from '@hooks/useForm';
import { useProjectAddMutation } from './projectsQuery';

import ProjectForm from '@components/Project/components/ProjectForm';
import { PlusIcon } from '@assets/Icons';
import Button from '@ui/Button';
import Dialog from '@ui/Dialog';

const AddProject = () => {
   const [projectData, updateValue, resetForm] = useForm(projectModel);
   const { mutate: addProject } = useProjectAddMutation();

   return (
      <DialogProvider>
         <ButtonAddProject />
         <Dialog
            onSuccess={() => {
               addProject({ name: projectData.name });
               resetForm();
            }}
         >
            <ProjectForm project={projectData} updateValue={updateValue} />
         </Dialog>
      </DialogProvider>
   );
};

const ButtonAddProject = () => {
   const { openDialog } = useDialogContext();
   return (
      <Button variant="icon" onClick={openDialog}>
         <PlusIcon size={20} />
      </Button>
   );
};

export default AddProject;
