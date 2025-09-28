import useForm from '@hooks/useForm';

import ProjectForm from '@components/Project/components/ProjectForm';
import Dialog from '@ui/Dialog';

import { useEditProjectMutation } from '../queries';

import type { Project } from '@frontend/data/types';

const EditProjectDialog = ({ project }: { project: Project }) => {
   const [projectPayload, updateValue, resetForm] = useForm({
      name: project.name,
   });

   const { mutate: editProject } = useEditProjectMutation(project.id);

   return (
      <Dialog
         onCancel={resetForm}
         onSuccess={() => editProject({ ...projectPayload })}
      >
         <ProjectForm project={projectPayload} updateValue={updateValue} />
      </Dialog>
   );
};

export default EditProjectDialog;
