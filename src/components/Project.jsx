import { useState, useEffect } from 'react';
import Task from './Task';
import ButtonAddTask from './ButtonAddTask';

function getTasks(projectId) {
   const tasks = localStorage.getItem(`tasks-${projectId}`);
   return JSON.parse(tasks) || [];
}

export default function Project({ project }) {
   const [tasks, setTasks] = useState(() => getTasks(project.id));

   useEffect(() => {
      setTasks(getTasks(project.id));
   }, [project]);

   useEffect(() => {
      localStorage.setItem(`tasks-${project.id}`, JSON.stringify(tasks));
   }, [tasks]);

   const addTask = newTask => {
      setTasks(prevTasks => [...prevTasks, newTask]);
   };

   const removeTask = taskIdToDelete => {
      setTasks(prevTasks =>
         prevTasks.filter(task => task.id != taskIdToDelete)
      );
   };

   const editTask = editedTask => {
      setTasks(prevTasks => {
         return prevTasks.map(task =>
            task.id === editedTask.id ? editedTask : task
         );
      });
   };

   return (
      <div>
         <h2>
            {project.name} {project.id}
         </h2>
         {tasks.length > 0 &&
            tasks.map(task => {
               return (
                  <Task
                     key={task.id}
                     task={task}
                     editTask={editTask}
                     removeTask={removeTask}
                  ></Task>
               );
            })}
         <div>
            <ButtonAddTask addTask={addTask} />
         </div>
      </div>
   );
}
