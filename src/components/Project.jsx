import Task from './Task';
export default function Project({ project, tasks, setTasks }) {
   const addTask = newTask => {
      setTasks(prevTasks => [...prevTasks, newTask]);
   };

   const removeTask = taskIdToDelete => {
      setTasks(prevTasks =>
         prevTasks.filter(task => task.id != taskIdToDelete),
      );
   };

   const editTask = editedTask => {
      setTasks(prevTasks => {
         return prevTasks.map(task =>
            task.id === editedTask.id ? editedTask : task,
         );
      });
   };

   return (
      <div>
         <h2>{project.name}</h2>
         {tasks.map(task => {
            return (
               <Task
                  key={task.id}
                  task={task}
                  editTask={editTask}
                  removeTask={removeTask}
               ></Task>
            );
         })}
      </div>
   );
}
