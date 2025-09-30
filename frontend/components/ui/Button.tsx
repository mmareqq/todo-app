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
   primary: twMerge(
      'border-accent-700 shadow-accent-700/30 hover:bg-accent-700 rounded-sm border px-10 py-1 transition-all duration-300 hover:shadow-lg',
   ),

   secondary: twMerge(
      'shadow-white-700/20 hover:bg-primary-600 focus:bg-primary-600 border-primary-600 transiton-colors rounded-sm border-1 px-2 py-0.5 duration-300 hover:shadow-lg focus:outline-none',
   ),

   icon: twMerge(
      'hover:bg-accent-700/30 rounded-sm p-1 transition-colors duration-300',
   ),

   dropdown: twMerge(
      'shadow-primary-600/10 hover:bg-primary-600 border-primary-600 transiton-colors focus:bg-primary-600/50 rounded-sm border-1 px-2 py-1 duration-300 hover:shadow-lg',
   ),
   glass: twMerge(
      'hover:bg-primary-700/50 border-primary-700 rounded-sm border px-2 py-0.5',
   ),
};

const activeStyles = {
   none: '',
   primary: '',
   secondary: '',
   icon: '',
   dropdown: '',
   glass: twMerge(
      styles.glass,
      twMerge(
         'border-accent-900 bg-accent-900/10 shadow-accent-950/50 pointer-events-none shadow',
      ),
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
