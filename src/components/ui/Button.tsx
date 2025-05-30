import { twMerge } from 'tailwind-merge';
import type { Children } from '@data/types';

type Variant = keyof typeof buttonStyles;

type ButtonAttributes = React.ButtonHTMLAttributes<HTMLButtonElement>;

type Props = {
   variant?: Variant;
   className?: string;
} & Children &
   ButtonAttributes;

const buttonStyles = {
   none: '',
   primary:
      'shadow-accent-700/20 hover:bg-accent-700 border-accent-700 transiton-colors rounded-sm border-1 px-10 py-1 duration-300 hover:shadow-lg',
   square:
      'hover:bg-accent-700/30 rounded-sm p-1 transition-colors duration-300',
   dropdown:
      'shadow-primary-600/10 hover:bg-primary-600 border-primary-600 transiton-colors rounded-sm border-1 px-2 py-1 duration-300 hover:shadow-lg',
};

const Button = ({
   variant = 'primary',
   className,
   children,
   ...props
}: Props) => {
   return (
      <button
         type="button"
         className={twMerge(buttonStyles[variant], className)}
         {...props}
      >
         {children}
      </button>
   );
};

export default Button;
