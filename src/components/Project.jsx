import { useState, useEffect } from 'react';
import Task from './Task';

export default function Project({ project }) {
   // const [tasks, setTasks] = useState([
   //    new TaskModel('1-1', 'Go for a walk', 2, false),
   //    new TaskModel('1-2', 'Read a book', 1, true),
   // ]);

   const [tasks, setTasks] = useState(
      JSON.parse(localStorage.getItem(`tasks-${project.id}`)) || [],
   );

   useEffect(() => {
      localStorage.setItem(`tasks-${project.id}`, JSON.stringify(tasks));
   }, [tasks]);

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
         {tasks.length &&
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
            <button type="button">Add Task</button>
         </div>
      </div>
   );
}
