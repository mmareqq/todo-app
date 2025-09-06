import type { TaskPayload } from '@data/types';
import type { UpdateValue } from '@data/helperTypes';

import NameInput from './NameInput';
import PriorityInput from './PriorityInput';
import DurationInput from './DurationInput';
import DateInput from './DateInput';

type Props = {
   task: TaskPayload;
   updateValue: UpdateValue<TaskPayload>;
};

const TaskForm = ({ task, updateValue }: Props) => {
   return (
      <div className="mb-6 grid gap-6">
         <NameInput name={task.name} updateValue={updateValue} />
         <PriorityInput priority={task.priority} updateValue={updateValue} />
         <DurationInput duration={task.duration} updateValue={updateValue} />
         <DateInput date={task.dueDate} updateValue={updateValue} />
      </div>
   );
};

export default TaskForm;
