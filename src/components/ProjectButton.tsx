import DeleteButton from '@ui/DeleteButton';
import Button from '@ui/Button';

import type { Project } from '@data/types';

type Props = {
   project: Project;
   onClick: () => void;
   onRemove: () => void;
};

const ProjectButton = ({ project, onClick, onRemove }: Props) => {
   return (
      <div className="flex pr-1 pl-3">
         <Button
            variant="none"
            className="w-full py-3 text-start"
            onClick={onClick}
         >
            {project.name}
         </Button>
         {project.editable && (
            <DeleteButton remove={onRemove}>{project.name}</DeleteButton>
         )}
      </div>
   );
};

export default ProjectButton;
