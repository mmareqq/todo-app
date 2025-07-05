import { useEffect, useState, useMemo } from 'react';
import type { Task } from '@data/types';

const getTasks = (): Task[] => {
   const tasks = localStorage.getItem(`tasks`);
   return tasks ? JSON.parse(tasks) : [];
};

const useTasks = (projectId: string) => {
   const [allTasks, setAllTasks] = useState(getTasks);

   const tasks = useMemo(
      () => allTasks.filter((task) => task.projectId === projectId),
      [allTasks, projectId],
   );

   useEffect(() => {
      localStorage.setItem(`tasks`, JSON.stringify(allTasks));
   }, [allTasks]);

   const addTask = (newTask: Task) => {
      setAllTasks((prevTasks) => [...prevTasks, newTask]);
   };

   const removeTask = (id: string) => {
      setAllTasks((prevTasks) => prevTasks.filter((task) => task.id != id));
   };

   const editTask = (editedTask: Task) => {
      setAllTasks((prevTasks) => {
         return prevTasks.map((task) =>
            task.id === editedTask.id ? editedTask : task,
         );
      });
   };

   return { tasks, addTask, removeTask, editTask };
};

export default useTasks;
