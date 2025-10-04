import type { UpdateValue } from '@frontend/data/helperTypes';
import type { TaskPayload } from '@frontend/data/types';

type Props = {
   dueDate: TaskPayload['dueDate'];
   updateValue: UpdateValue<TaskPayload>;
};

const DateInput = ({ dueDate, updateValue }: Props) => {
   return (
      <div className="flex gap-5">
         <span>Date:</span>
         <input
            type="date"
            id="task-dueDate"
            name="task-dueDate"
            value={dueDate === null ? '' : dueDate}
            onChange={e => updateValue('dueDate', e.target.value)}
         />
      </div>
   );
};

export default DateInput;
