import useForm from '@hooks/useForm';

import ProjectForm from '@components/ProjectForm';
import Dialog from '@ui/Dialog';

const EditProjectDialog = ({ project, editProject }) => {
   const [projectData, updateValue, reset] = useForm(project);
   return (
      <Dialog onCancel={reset} onSuccess={() => editProject(projectData)}>
         <ProjectForm project={projectData} updateValue={updateValue} />
      </Dialog>
   );
};

export default EditProjectDialog;
