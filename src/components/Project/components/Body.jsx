import Task from '@components/Task';

function Body({ tasks, editTask, removeTask }) {
   return (
      <div className="max-h-full overflow-y-auto">
         <div className="grid gap-4 overflow-x-hidden pr-1">
            {tasks.map((task, i) => {
               return (
                  <Task
                     key={task.id}
                     task={task}
                     editTask={editTask}
                     removeTask={removeTask}
                     animationDelay={i * 0.05}
                  />
               );
            })}
         </div>
      </div>
   );
}

export default Body;
