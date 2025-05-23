import { useEffect, useState } from 'react';

function useTasks(projectId) {
   const [tasks, setTasks] = useState(() => getTasks(projectId));

   useEffect(() => {
      setTasks(getTasks(projectId));
   }, [projectId]);

   useEffect(() => {
      localStorage.setItem(`tasks-${projectId}`, JSON.stringify(tasks));
   }, [tasks, projectId]);

   const addTask = newTask => {
      setTasks(prevTasks => [...prevTasks, newTask]);
   };

   const removeTask = taskIdToDelete => {
      setTasks(prevTasks =>
         prevTasks.filter(task => task.id != taskIdToDelete),
      );
   };

   const editTask = editedTask => {
      console.log('task edited', editedTask);
      setTasks(prevTasks => {
         return prevTasks.map(task =>
            task.id === editedTask.id ? editedTask : task,
         );
      });
   };

   return { tasks, addTask, removeTask, editTask };
}

function getTasks(projectId) {
   const tasks = localStorage.getItem(`tasks-${projectId}`);
   return JSON.parse(tasks) || [];
}

export default useTasks;
