import type { StateSetter } from '@frontend/data/helperTypes';
import type { Project, Id } from '@frontend/data/types';
import { twMerge } from 'tailwind-merge';

import Button from '@ui/Button';

type ButtonProps = {
   isActive: boolean;
   setId: StateSetter<Id>;
   project: Project;
};

const NavButton = ({ isActive, setId, project }: ButtonProps) => {
   return (
      <li
         className={twMerge(
            'border-l-2 border-transparent px-2',
            isActive && 'border-l-accent-700',
         )}
      >
         <Button
            variant="none"
            className={twMerge(
               'hover:bg-primary-700/50 nav-btn w-full rounded-md px-3 py-1.5 text-start',
               isActive && 'bg-primary-700/30 hover:bg-primary-none',
            )}
            onClick={() => setId(project.id)}
         >
            {project.name}
         </Button>
      </li>
   );
};

export default NavButton;
