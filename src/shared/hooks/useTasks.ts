import { useEffect, useState, useMemo } from 'react';
import type { Task } from '@data/types';

import { compareDates, getToday } from '@utils/time';
import useSettingsContext from './useSettingsContext';

const getTasks = (): Task[] => {
   const tasks = localStorage.getItem(`tasks`);
   return tasks ? JSON.parse(tasks) : [];
};

const filterTasks = (allTasks: Task[], projectId: string) => {
   const today = getToday();
   switch (projectId) {
      case 'today':
         return allTasks.filter((task) => task.date === getToday());
      case 'upcoming':
         return allTasks.filter((task) => {
            if (!task.date) return false;
            return compareDates(today, task.date) <= 0;
         });
      default:
         return allTasks.filter((task) => task.projectId === projectId);
   }
};

const useTasks = (projectId: string) => {
   const [allTasks, setAllTasks] = useState(getTasks);
   const { settings } = useSettingsContext();

   const tasks = useMemo(
      () => filterTasks(allTasks, projectId),
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
