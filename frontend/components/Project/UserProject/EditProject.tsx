import DialogProvider from '@contexts/DialogProvider';
import Dialog from '@ui/Dialog';

import useForm from '@hooks/useForm';

import ProjectForm from '@components/Navbar/ProjectForm';
import EditButton from '@ui/EditButton';

import useEditProjectMutation from './api/useEditProjectMutation';

import type { Project } from '@frontend/data/types';

const EditProject = ({ project }: { project: Project }) => {
   const {
      data: projectPayload,
      updateValue,
      resetForm,
   } = useForm({
      name: project.name,
   });

   const { mutate: editProject } = useEditProjectMutation(project);
   return (
      <DialogProvider>
         <EditButton label={project.name} />
         <Dialog
            onCancel={resetForm}
            onSuccess={() => {
               editProject({ ...projectPayload });
               resetForm({ name: projectPayload.name });
            }}
         >
            <ProjectForm project={projectPayload} updateValue={updateValue} />
         </Dialog>
      </DialogProvider>
   );
};

export default EditProject;
