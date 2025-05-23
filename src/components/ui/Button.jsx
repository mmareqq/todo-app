import { twMerge } from 'tailwind-merge';

const buttonStyles = {
   none: '',
   primary:
      'shadow-accent-700/20 hover:bg-accent-700 border-accent-700 transiton-all rounded-sm border-1 px-10 py-1 duration-300 hover:shadow-lg',
   square:
      'hover:bg-accent-700/30 rounded-sm p-1 transition-colors duration-300',
   dropdown:
      'shadow-primary-600/10 hover:bg-primary-600 border-primary-600 transiton-all rounded-sm border-1 px-2 py-1 duration-300 hover:shadow-lg',
};

const Button = ({ variant = 'primary', className, ...props }) => {
   return (
      <button
         type="button"
         className={twMerge(buttonStyles[variant], className)}
         {...props}
      />
   );
};

export default Button;
