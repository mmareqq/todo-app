import useForm from '@hooks/useForm';

import ProjectForm from '@components/Project/components/ProjectForm';
import Dialog from '@ui/Dialog';

import type { ProjectActions } from '@data/types';

type Props = Pick<ProjectActions, 'project' | 'editProject'>;

const EditProjectDialog = ({ project, editProject }: Props) => {
   const [projectData, updateValue, reset] = useForm(project);
   return (
      <Dialog onCancel={reset} onSuccess={() => editProject(projectData)}>
         <ProjectForm project={projectData} updateValue={updateValue} />
      </Dialog>
   );
};

export default EditProjectDialog;
