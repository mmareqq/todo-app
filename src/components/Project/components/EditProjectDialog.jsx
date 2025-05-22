import useForm from '@hooks/useForm';
import useDialogContext from '@hooks/useDialogContext';
import ProjectForm from '@components/ProjectForm';
import Dialog from '@ui/Dialog';

const EditProjectDialog = ({ project, editProject }) => {
   const { isOpen, closeDialog } = useDialogContext();
   const [projectData, updateValue, reset] = useForm(project);
   return (
      <Dialog
         isOpen={isOpen}
         closeDialog={closeDialog}
         onCancel={reset}
         onSuccess={() => editProject(projectData)}
      >
         <ProjectForm project={projectData} updateValue={updateValue} />
      </Dialog>
   );
};

export default EditProjectDialog;
