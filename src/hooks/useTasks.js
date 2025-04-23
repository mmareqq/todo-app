import { useEffect, useState } from 'react';

import getTasks from '../utils/getTasks';

function useTasks(projectId) {
   const [tasks, setTasks] = useState(() => getTasks(projectId));

   useEffect(() => {
      localStorage.setItem(`tasks-${projectId}`, JSON.stringify(tasks));
   }, [tasks, projectId]);

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

   return [tasks, setTasks, addTask, removeTask, editTask];
}

export default useTasks;
