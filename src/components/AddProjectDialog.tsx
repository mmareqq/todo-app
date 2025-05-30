import useForm from '@hooks/useForm';
import { initalizeTasksInStorage } from '@utils/localStorage';
import generateId from '@utils/generateId';

import ProjectForm from './ProjectForm';
import Dialog from '@ui/Dialog';
import { projectModel } from '@data/data';

import type { Project } from '@data/types';

type Props = {
   addProject: (proj: Project) => void;
};

function AddProjectDialog({ addProject }: Props) {
   const [projectData, updateValue, resetForm] = useForm(projectModel);

   return (
      <Dialog
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
