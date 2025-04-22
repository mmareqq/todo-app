import { EditIcon } from '../assets/Icons';
import Dialog from './Dialog';
import useDialog from '../hooks/useDialog';
import useForm from '../hooks/useForm';
import ProjectForm from './ProjectForm';
import Button from './Button';

export default function EditButton({ editProject, project }) {
   const [isDialogOpen, openDialog, closeDialog] = useDialog();
   const [data, updateValue, reset] = useForm(project);
   return (
      <>
         <Button variant="square" onClick={openDialog}>
            <span className="sr-only">open edit dialog: {project.name}</span>
            <EditIcon />
         </Button>
         <Dialog
            isOpen={isDialogOpen}
            closeDialog={closeDialog}
            onCancel={reset}
            onSuccess={() => editProject(data)}
         >
            <ProjectForm project={data} updateValue={updateValue} />
         </Dialog>
      </>
   );
}
