import { HourGlassIcon } from '@assets/Icons';
import { formatDuration } from '@frontend/utils/time';
import SortMenu from './SortMenu';

const InfoPanel = () => {
   const totalDuration = 0; // FIXME: SHould be gettting it from query select
   return (
      <div className="flex items-center justify-between">
         <div className="my-6 flex items-center gap-1 text-sm">
            <HourGlassIcon size={18} />
            <div>Total Duration: {formatDuration(totalDuration)}</div>
         </div>

         <SortMenu />
      </div>
   );
};

export default InfoPanel;
