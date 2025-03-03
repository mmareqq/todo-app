import { twMerge } from 'tailwind-merge';

export default function Button({
   variant = 'default',
   onClick,
   className,
   children,
}) {
   const variantStyles = {
      default:
         'shadow-accent-700/10 hover:bg-accent-700 border-accent-700 transiton-all rounded-sm border-1 px-10 py-1 duration-300 hover:shadow-lg',
      square:
         'hover:bg-accent-700/30 rounded-sm p-1 transition-colors duration-300',
   };
   return (
      <button
         type="button"
         className={twMerge(className, variantStyles[variant])}
         onClick={onClick}
      >
         {children}
      </button>
   );
}
