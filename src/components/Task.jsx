import TrashButton from './TrashButton';
export default function Task({ task, removeTask, editTask }) {
   const priorityColors = {
      0: 'bg-gray-400',
      1: 'bg-blue-400',
      2: 'bg-yellow-400',
      3: 'bg-red-400',
   };
   console.log(task.name, ' ', task.finished);
   return (
      <div
         className={`task flex items-center gap-2 border-2 border-solid border-black ${task.finished ? 'line-through' : ''}`}
      >
         <h3>{task.name}</h3>
         <button
            type="button"
            className={`h-5 w-5 ${priorityColors[task.priority]}`}
            onClick={() => {
               editTask({ ...task, finished: !task.finished });
            }}
         >
            <span className="sr-only">complete task</span>
         </button>
         <TrashButton
            remove={removeTask}
            id={task.id}
            text={`task ${task.name}`}
         ></TrashButton>
      </div>
   );
}
