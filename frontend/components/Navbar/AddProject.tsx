import DialogProvider from '@contexts/DialogProvider';
import { projectModel } from '@frontend/data/data';
import useForm from '@hooks/useForm';
import useProjectAddMutation from './api/useProjectAddMutation';

import ProjectForm from '@components/Navbar/ProjectForm';
import useDialogContext from '@hooks/useDialogContext';
import Dialog from '@ui/Dialog';
import Button from '@ui/Button';

import { PlusIcon } from '@assets/Icons';
import { useUser } from '@clerk/clerk-react';

const AddProject = () => {
   const { user } = useUser();
   const { data: projectData, updateValue, resetForm } = useForm(projectModel);
   const { mutate: addProject } = useProjectAddMutation();

   return (
      <DialogProvider>
         <AddButton />
         <Dialog
            onSuccess={() => {
               if (!user) {
                  throw new Error('user not logged in. cannot create project');
               }
               addProject({
                  name: projectData.name,
                  type: 'custom',
                  user_id: user.id,
               });
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
