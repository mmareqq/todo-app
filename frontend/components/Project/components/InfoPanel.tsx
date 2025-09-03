import { HourGlassIcon } from '@assets/Icons';
import { formatDuration } from '@utils/time';
import SortMenu from './SortMenu';

type Props = { totalDuration: number };

const InfoPanel = ({ totalDuration }: Props) => {
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
