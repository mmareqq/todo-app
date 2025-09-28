import DialogProvider from '@contexts/DialogProvider';
import { projectModel } from '@frontend/data/data';
import useForm from '@hooks/useForm';
import { useProjectAddMutation } from './projectsQuery';

import ProjectForm from '@components/Project/components/ProjectForm';
import Dialog from '@ui/Dialog';
import AddButton from '@ui/AddButton';

const AddProject = () => {
   const [projectData, updateValue, resetForm] = useForm(projectModel);
   const { mutate: addProject } = useProjectAddMutation();

   return (
      <DialogProvider>
         <AddButton label="Add Project" />
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

export default AddProject;
