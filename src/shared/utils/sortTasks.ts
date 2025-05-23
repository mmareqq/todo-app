import { type Task } from '@data/types';

type Method =
   | 'priority'
   | 'name'
   | 'creation-date'
   | 'duration'
   | 'groupByDate';

export default function sortTasks(tasks: Task[], method: Method) {
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

function compareStrings(str1: string, str2: string) {
   return str1.localeCompare(str2, undefined, {
      sensitivity: 'base',
      numeric: true,
   });
}
