import { setStyle } from 'motion';
import { twMerge } from 'tailwind-merge';

type Variant = keyof typeof styles;

type ButtonAttributes = React.ButtonHTMLAttributes<HTMLButtonElement>;

type Props = {
   variant?: Variant;
   active?: boolean;
   className?: string;
} & ButtonAttributes;

const styles = {
   none: '',
   primary:
      'shadow-accent-700/20 hover:bg-accent-700 border-accent-700 transiton-colors rounded-sm border-1 px-10 py-1 duration-300 hover:shadow-lg',
   icon: 'hover:bg-accent-700/30 rounded-sm p-1 transition-colors duration-300',

   secondary:
      'shadow-white-700/20 hover:bg-accent-700 border-accent-700 transiton-colors border-1 px-4 py-0.5 rounded-full duration-300 hover:shadow-lg',

   dropdown:
      'shadow-primary-600/10 focus:bg-primary-600 focus:outline-none hover:bg-primary-600 border-primary-600 transiton-colors rounded-sm border-1 px-2 py-1 duration-300 hover:shadow-lg',
   glass: 'hover:bg-primary-700/50 border rounded-sm py-0.5 px-2 border-primary-700',
};

const activeStyles = {
   none: '',
   primary: '',
   secondary: '',
   icon: '',
   dropdown: '',
   glass: twMerge(
      styles.glass,
      'bg-accent-900/10 shadow shadow-accent-950/50 border-accent-900 pointer-events-none',
   ),
};

const Button = ({
   variant = 'primary',
   active = false,
   className,
   ...props
}: Props) => {
   const variantStyles = active ? activeStyles[variant] : styles[variant];

   return (
      <button
         type="button"
         className={twMerge(variantStyles, className)}
         {...props}
      />
   );
};

export default Button;
