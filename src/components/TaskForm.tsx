import { useState, createContext, useContext } from 'react';
import { twMerge } from 'tailwind-merge';
import { CheckMarkIcon, PriorityIcon, EditIcon, PlusIcon } from '@assets/Icons';
import { priorityColors } from '@data/data';
import Button from '@ui/Button';

import useDurationValues from '@hooks/useDurationValues';
import { formatDuration } from '@utils/formatTime';

import type { Children, Task } from '@data/types';
import type { UpdateValue } from '@data/helperTypes';

type Props = {
   task: Task;
   updateValue: UpdateValue<Task>;
} & Children;

type ContextType = {
   updateValue: Props['updateValue'];
} & {
   [K in keyof Task]: Task[K];
};

const FormContext = createContext<ContextType>(null!);

const TaskForm = ({ task, updateValue, children }: Props) => {
   return (
      <FormContext.Provider value={{ updateValue, ...task }}>
         <div className="mb-6 grid gap-6">{children}</div>
      </FormContext.Provider>
   );
};

const NameInput = () => {
   const { name, updateValue } = useContext(FormContext);
   return (
      <div>
         <label htmlFor="taskName">Name</label>
         <input
            className="ml-2 border"
            type="text"
            id="taskName"
            name="taskName"
            value={name}
            onChange={(e) => updateValue('name', e.target.value)}
         />
      </div>
   );
};

const PriorityInput = () => {
   const { priority, updateValue } = useContext(FormContext);
   return (
      <div className="grid gap-2">
         <div className="mb-1">Priority</div>
         <div className="flex justify-between">
            {[0, 1, 2, 3].map((i) => {
               return (
                  <label
                     key={i}
                     className={`priority-input transition-color cursor-pointer border-1 p-4 duration-250 hover:ring ${priorityColors[i]} ${priority === i ? 'bg-current/10' : ''}`}
                  >
                     <input
                        className="sr-only"
                        type="radio"
                        name="taskPriority"
                        onChange={() => updateValue('priority', i)}
                        checked={priority === i}
                     />
                     <PriorityIcon className="h-full w-full" />
                     <div className="sr-only">Priority {i}</div>
                  </label>
               );
            })}
         </div>
      </div>
   );
};

const DurationInput = () => {
   const { duration, updateValue } = useContext(FormContext);
   const [durValues, addDurValue, removeDurValue] = useDurationValues();
   const [editDuration, setEditDuration] = useState(false);
   const [newDuration, setNewDuration] = useState('');

   const styleDefault =
      'hover:bg-primary-700/50 border border-primary-700 px-2';
   const styleActive = twMerge(
      styleDefault,
      'bg-accent-900/10 shadow shadow-accent-950/50 border-accent-900 pointer-events-none',
   );
   return (
      <div>
         <div className="mb-2 flex justify-between">
            <div>Duration:</div>
            <div className="flex">
               {editDuration ? (
                  <div className="flex items-center gap-1">
                     <input
                        type="text"
                        value={newDuration}
                        placeholder="0"
                        className="placeholder-shown:text-primary-400 text-primary-200 w-12 rounded-sm border border-current py-0.5 pl-2 text-sm focus:outline-none"
                        onChange={(e) => {
                           const val = e.target.value;
                           if (val.length > 3) return;
                           if (parseInt(val) || val === '') setNewDuration(val);
                        }}
                     />
                     <Button
                        variant="square"
                        onClick={() => {
                           if (!newDuration) return;
                           addDurValue(parseInt(newDuration));
                           setNewDuration('');
                        }}
                     >
                        <PlusIcon size="18" />
                     </Button>{' '}
                     <Button
                        variant="square"
                        onClick={() => setEditDuration(false)}
                     >
                        <CheckMarkIcon />
                     </Button>
                  </div>
               ) : (
                  <Button
                     variant="square"
                     onClick={() => setEditDuration(true)}
                  >
                     <EditIcon />
                  </Button>
               )}
            </div>
         </div>
         <ul className="flex flex-wrap items-center gap-2">
            <li>
               <Button
                  variant="square"
                  className={duration ? styleDefault : styleActive}
                  onClick={() => updateValue('duration', 0)}
               >
                  None
               </Button>
            </li>
            {durValues.map((val) => {
               return (
                  <li key={val} className="group relative">
                     <Button
                        variant="square"
                        className={
                           duration === val ? styleActive : styleDefault
                        }
                        onClick={() => updateValue('duration', val)}
                     >
                        {formatDuration(val)}
                     </Button>
                     {editDuration && (
                        <Button
                           variant="square"
                           className="hover:bg-primary-700 right text-normal invisible absolute inset-0 rounded-xs transition-none group-hover:visible"
                           onClick={() => {
                              removeDurValue(val);
                              if (val === duration) updateValue('duration', 0);
                           }}
                        >
                           X
                        </Button>
                     )}
                  </li>
               );
            })}
         </ul>
      </div>
   );
};

const DateInput = () => {
   const { date, updateValue } = useContext(FormContext);
   return (
      <div className="flex gap-5">
         <span>Date:</span>
         <input
            type="date"
            id="task-date"
            name="task-date"
            value={date ?? ''}
            onChange={(e) => updateValue('date', e.target.value)}
         />
      </div>
   );
};

TaskForm.NameInput = NameInput;
TaskForm.PriorityInput = PriorityInput;
TaskForm.DurationInput = DurationInput;
TaskForm.DateInput = DateInput;

export default TaskForm;
