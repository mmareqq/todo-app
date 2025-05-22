import { WarningIcon } from '@assets/Icons';
const WarningInfo = ({ includeIcon = true, children, ...props }) => {
   return (
      <div className="text-warning-400 bg-warning-700/10 flex items-center gap-1 rounded-sm p-0.5 px-2 text-sm">
         {includeIcon && <WarningIcon />}
         <div {...props}>{children}</div>
      </div>
   );
};

export default WarningInfo;
