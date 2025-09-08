import useForm from '@hooks/useForm';
import generateId from '@frontend/utils/generateId';

import ProjectForm from './Project/components/ProjectForm';
import Dialog from '@ui/Dialog';
import { projectModel } from '@frontend/data/data';

import type { Project } from '@frontend/data/types';

type Props = {
   addProject: (proj: Project) => void;
};

function AddProjectDialog({ addProject }: Props) {
   const [projectData, updateValue, resetForm] = useForm(projectModel);

   return (
      <Dialog
         onSuccess={() => {
            const project: Project = {
               id: generateId(),
               name: projectData.name,
               type: 'custom',
            };
            addProject(project);
            resetForm();
         }}
      >
         <ProjectForm project={projectData} updateValue={updateValue} />
      </Dialog>
   );
}

export default AddProjectDialog;
