import DialogProvider from '@contexts/DialogProvider';
import Dialog from '@ui/Dialog';

import useForm from '@hooks/useForm';

import ProjectForm from '@components/Navbar/ProjectForm';
import EditButton from '@ui/EditButton';

import useEditProjectMutation from './queries/useEditProjectMutation';

import type { Project } from '@frontend/data/types';

const EditProject = ({ project }: { project: Project }) => {
   const [projectPayload, updateValue, resetForm] = useForm({
      name: project.name,
   });

   const { mutate: editProject } = useEditProjectMutation(project.id);
   return (
      <DialogProvider>
         <EditButton label={project.name} />
         <Dialog
            onCancel={resetForm}
            onSuccess={() => editProject({ ...projectPayload })}
         >
            <ProjectForm project={projectPayload} updateValue={updateValue} />
         </Dialog>
      </DialogProvider>
   );
};

export default EditProject;
