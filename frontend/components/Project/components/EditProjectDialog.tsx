import useForm from '@hooks/useForm';

import ProjectForm from '@components/Project/components/ProjectForm';
import Dialog from '@ui/Dialog';

import type { ProjectActions, ProjectPayload } from '@frontend/data/types';

type Props = Pick<ProjectActions, 'project' | 'editProject'>;

const EditProjectDialog = ({ project, editProject }: Props) => {
   const projectPayload: ProjectPayload = project;
   const [projectData, updateValue, reset] = useForm(projectPayload);

   return (
      <Dialog
         onCancel={reset}
         onSuccess={() => editProject({ ...project, ...projectData })}
      >
         <ProjectForm project={projectData} updateValue={updateValue} />
      </Dialog>
   );
};

export default EditProjectDialog;
