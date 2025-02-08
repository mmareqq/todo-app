export default function Project({ projectObj }) {
   return (
      <div>
         <h2>{projectObj.name}</h2>
         {projectObj.tasks.map(task => {
            return (
               <div>
                  <h3>Name: {task.name}</h3>
                  <p>Priority: {task.priority}</p>
                  <p>Finished: {task.isFinished ? 'Yes' : 'No'}</p>
               </div>
            );
         })}
      </div>
   );
}
