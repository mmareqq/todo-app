import { useEffect, useState } from 'react';
import type { Project, Task } from '@data/types';

function useTasks(projectId: Project['id']) {
   const [tasks, setTasks] = useState(() => getTasks(projectId));

   useEffect(() => {
      setTasks(getTasks(projectId));
   }, [projectId]);

   useEffect(() => {
      localStorage.setItem(`tasks-${projectId}`, JSON.stringify(tasks));
   }, [tasks, projectId]);

   const addTask = (newTask: Task) => {
      setTasks((prevTasks) => [...prevTasks, newTask]);
   };

   const removeTask = (id: Task['id']) => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id != id));
   };

   const editTask = (editedTask: Task) => {
      setTasks((prevTasks) => {
         return prevTasks.map((task) =>
            task.id === editedTask.id ? editedTask : task,
         );
      });
   };

   return { tasks, addTask, removeTask, editTask };
}

const getTasks = (projectId: Project['id']): Task[] => {
   const tasks = localStorage.getItem(`tasks-${projectId}`);
   return tasks ? JSON.parse(tasks) : [];
};

export default useTasks;
