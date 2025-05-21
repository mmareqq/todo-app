import { tasksTemplate } from '@data/data';
import ButtonAddTask from './ButtonAddTask';

function Menu({ addTask }) {
   return (
      <div className="mt-4 flex justify-end gap-4">
         <button
            className="rounded-sm border-1 border-yellow-700 px-4 py-1"
            type="button"
            onClick={() => tasksTemplate.forEach(task => addTask(task))}
         >
            Load 5 tasks
         </button>
         <ButtonAddTask addTask={addTask} />
      </div>
   );
}

export default Menu;
