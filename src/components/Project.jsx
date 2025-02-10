import Task from './Task';
export default function Project({ project }) {
   return (
      <div>
         <h2>{project.name}</h2>
         {project.tasks.map(task => {
            return <Task key={task.id} task={task}></Task>;
         })}
      </div>
   );
}
