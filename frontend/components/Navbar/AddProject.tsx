import DialogProvider from '@contexts/DialogProvider';
import { projectModel } from '@frontend/data/data';
import useForm from '@hooks/useForm';
import { useProjectAddMutation } from './projectsQuery';

import ProjectForm from '@components/Project/components/ProjectForm';
import useDialogContext from '@hooks/useDialogContext';
import Dialog from '@ui/Dialog';
import Button from '@ui/Button';

import { PlusIcon } from '@assets/Icons';

const AddProject = () => {
   const [projectData, updateValue, resetForm] = useForm(projectModel);
   const { mutate: addProject } = useProjectAddMutation();

   return (
      <DialogProvider>
         <AddButton />
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

const AddButton = () => {
   const { openDialog } = useDialogContext();
   return (
      <Button variant="icon" onClick={openDialog}>
         <PlusIcon />
      </Button>
   );
};

export default AddProject;
