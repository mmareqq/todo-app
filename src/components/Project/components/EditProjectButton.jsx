import { EditIcon } from '@assets/Icons';
import useDialog from '@hooks/useDialog';
import useForm from '@hooks/useForm';

import Dialog from '@ui/Dialog';
import ProjectForm from '@components/ProjectForm';
import Button from '@ui/Button';

export default function EditProjectButton({ project, editProject }) {
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
