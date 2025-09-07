import generateId from './generateId';

import { compareStrings } from './stringUtils';
import { getDatesMap } from './time';
import { convertMapToArray } from './convert';

import type { Task, SortMethod } from '@data/types';

export const sortTasks = (tasks: Task[], sortMethod: SortMethod) => {
   switch (sortMethod) {
      case 'priority':
         return sortTasksByPriority(tasks);
      case 'name':
         return sortTasksByName(tasks);
      case 'duration':
         return sortTasksByDuration(tasks);
      case 'dueDate':
         return sortTasksByDueDate(tasks);

      default:
         throw new Error('Wrong method for sorting tasks');
   }
};

function sortTasksByPriority(tasks: Task[]) {
   const order = {
      none: 0,
      low: 1,
      medium: 2,
      high: 3,
   };
   return tasks.toSorted(
      (task1, task2) => order[task2.priority] - order[task1.priority],
   );
}

function sortTasksByDuration(tasks: Task[]) {
   return tasks.toSorted((task1, task2) => task2.duration - task1.duration);
}

function sortTasksByName(tasks: Task[]) {
   return tasks.toSorted((task1, task2) =>
      compareStrings(task1.name, task2.name),
   );
}

function sortTasksByDueDate(tasks: Task[]) {
   return tasks.toSorted((task1, task2) =>
      compareStrings(task1.dueDate || '0', task2.dueDate || '-1'),
   );
}

export function groupTasksByDate(tasks: Task[]) {
   const dates = getDatesMap<Task>();

   tasks.forEach(task => {
      if (!task.dueDate) return;
      const dateTasks = dates.get(task.dueDate);
      if (dateTasks) dateTasks.push(task);
   });

   return convertMapToArray(dates);
}

export const getTasksTemplate = (projectId: string): Task[] => {
   return [
      {
         id: generateId(),
         projectId: projectId,
         completed: false,
         name: 'Task 1',
         priority: 'high',
         duration: 15,
         dueDate: '2025-07-30',
         createdAt: new Date().toISOString(),
      },
      {
         id: generateId(),
         projectId: projectId,
         completed: false,
         name: 'Task 2',
         priority: 'medium',
         duration: 90,
         dueDate: '2025-08-01',
         createdAt: new Date().toISOString(),
      },
      {
         id: generateId(),
         projectId: projectId,
         completed: false,
         name: 'Task 3',
         priority: 'low',
         duration: 45,
         dueDate: '2025-07-25',
         createdAt: new Date().toISOString(),
      },
      {
         id: generateId(),
         projectId: projectId,
         completed: false,
         name: 'Task 4',
         priority: 'high',
         duration: 15,
         dueDate: '2025-08-10',
         createdAt: new Date().toISOString(),
      },
      {
         id: generateId(),
         projectId: projectId,
         completed: false,
         name: 'Task 5',
         priority: 'none',
         duration: 5,
         dueDate: '2025-08-12',
         createdAt: new Date().toISOString(),
      },
   ];
};
