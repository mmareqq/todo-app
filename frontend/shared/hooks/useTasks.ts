import { useEffect, useState, useMemo } from 'react';
import type { Task, Id } from '@frontend/data/types';

import { compareDates, getToday } from '@frontend/utils/time';

const getTasks = (): Task[] => {
   const tasks = localStorage.getItem(`tasks`);
   return tasks ? JSON.parse(tasks) : [];
};

const filterTasks = (allTasks: Task[], projectId: string) => {
   const today = getToday();
   switch (projectId) {
      case 'today':
         return allTasks.filter(task => task.dueDate === getToday());
      case 'upcoming':
         return allTasks.filter(task => {
            if (!task.dueDate) return false;
            return compareDates(today, task.dueDate) <= 0;
         });
      default:
         return allTasks.filter(task => task.projectId === projectId);
   }
};

const useTasks = (projectId: string) => {
   const [allTasks, setAllTasks] = useState(getTasks);

   const tasks = useMemo(
      () => filterTasks(allTasks, projectId),
      [allTasks, projectId],
   );

   useEffect(() => {
      localStorage.setItem(`tasks`, JSON.stringify(allTasks));
   }, [allTasks]);

   const addTask = (newTask: Task) => {
      setAllTasks(prevTasks => [...prevTasks, newTask]);
   };

   const removeTask = (id: Id) => {
      setAllTasks(prevTasks => prevTasks.filter(task => task.id != id));
   };

   const editTask = (editedTask: Task) => {
      setAllTasks(prevTasks => {
         return prevTasks.map(task =>
            task.id === editedTask.id ? editedTask : task,
         );
      });
   };

   return { tasks, addTask, removeTask, editTask };
};

export default useTasks;
