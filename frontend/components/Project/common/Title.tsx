import type { Children } from '@frontend/data/types';
import { twMerge } from 'tailwind-merge';
type Props = {
   title: string;
   className?: string;
} & Children;
const Title = ({ title, className = '', children }: Props) => {
   return (
      <div
         className={twMerge(
            'border-primary-500 align-center flex items-end justify-between border-b-1 pt-6 pb-1',
            className,
         )}
      >
         <h2 className="text-2xl">{title}</h2>
         {children}
      </div>
   );
};

export default Title;
