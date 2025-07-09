import type { UpdateValue } from '@data/helperTypes';
import type { TaskPayload } from '@data/types';

type Props = {
   name: string;
   updateValue: UpdateValue<TaskPayload>;
};

const NameInput = ({ name, updateValue }: Props) => {
   return (
      <div>
         <label htmlFor="taskName">Name:</label>
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

export default NameInput;
