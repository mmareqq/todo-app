import type { Task } from '@data/types';
import generateId from './generateId';

import { compareStrings } from './stringUtils';
import type { SortMethod } from '@data/types';
export function sortTasks(tasks: Task[], sortMethod: SortMethod) {
   switch (sortMethod) {
      case 'priority':
         return sortTasksByPriority(tasks);
      case 'name':
         return sortTasksByName(tasks);
      case 'duration':
         return sortTasksByDuration(tasks);
      default:
         throw new Error('Wrong method for sorting tasks');
   }
}

function sortTasksByPriority(tasks: Task[]) {
   return tasks.toSorted((task1, task2) => task2.priority - task1.priority);
}

function sortTasksByDuration(tasks: Task[]) {
   return tasks.toSorted((task1, task2) => task2.duration - task1.duration);
}

function sortTasksByName(tasks: Task[]) {
   return tasks.toSorted((task1, task2) =>
      compareStrings(task1.name, task2.name),
   );
}

function sortTasksByDate(tasks: Task[]) {
   return tasks.toSorted((task1, task2) =>
      compareStrings(task1.date || '0', task2.date || '-1'),
   );
}

export function groupTasksByDate(tasks: Task[]) {
   const sortedTasks = sortTasksByDate(tasks);
   const dates: Record<string, Task[]> = {};
   sortedTasks.forEach((task) => {
      if (!task.date) return;
      if (dates[task.date]) dates[task.date].push(task);
      else dates[task.date] = [task];
   });
   return dates;
}

export const getTasksTemplate = (projectId: string): Task[] => {
   return [
      {
         id: generateId(),
         projectId: projectId,
         finished: false,
         name: 'Task 1',
         priority: 2,
         duration: 15,
         date: null,
         createdAt: new Date().toISOString(),
      },
      {
         id: generateId(),
         projectId: projectId,
         finished: false,
         name: 'Task 2',
         priority: 0,
         duration: 90,
         date: null,
         createdAt: new Date().toISOString(),
      },
      {
         id: generateId(),
         projectId: projectId,
         finished: false,
         name: 'Task 3',
         priority: 1,
         duration: 45,
         date: null,
         createdAt: new Date().toISOString(),
      },
      {
         id: generateId(),
         projectId: projectId,
         finished: false,
         name: 'Task 4',
         priority: 2,
         duration: 15,
         date: null,
         createdAt: new Date().toISOString(),
      },
      {
         id: generateId(),
         projectId: projectId,
         finished: false,
         name: 'Task 5',
         priority: 3,
         duration: 5,
         date: null,
         createdAt: new Date().toISOString(),
      },
   ];
};
