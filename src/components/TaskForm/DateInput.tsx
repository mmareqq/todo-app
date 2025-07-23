import type { UpdateValue } from '@data/helperTypes';
import type { TaskPayload } from '@data/types';

type Props = {
   date: string | null;
   updateValue: UpdateValue<TaskPayload>;
};

const DateInput = ({ date, updateValue }: Props) => {
   return (
      <div className="flex gap-5">
         <span>Date:</span>
         <input
            type="date"
            id="task-date"
            name="task-date"
            value={date ?? ''}
            onChange={e => updateValue('date', e.target.value)}
         />
      </div>
   );
};

export default DateInput;
