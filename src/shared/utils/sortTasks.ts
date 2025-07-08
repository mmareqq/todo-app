import type { Task, SortMethod } from '@data/types';

import { compareStrings } from './stringUtils';

function sortTasks(tasks: Task[], method: SortMethod) {
   switch (method) {
      case 'priority':
         return sortTasksByPriority(tasks);
      case 'name':
         return sortTasksByName(tasks);
      case 'creation-date':
         return sortTasksByCreationDate(tasks);
      case 'duration':
         return sortTasksByDuration(tasks);
      case 'groupByDate':
         return groupTasksByDate(tasks);
      default:
         throw new Error('Wrong method for sorting tasks');
   }
}

export default sortTasks;

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

function groupTasksByDate(tasks: Task[]) {
   return tasks;
}

function sortTasksByCreationDate(tasks: Task[]) {
   console.warn('sortTasksByCreationDate not implemented yet');
   return tasks;
}
