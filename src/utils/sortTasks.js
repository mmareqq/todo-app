export default function sortTasks(tasks, method) {
   switch (method) {
      case 'priority':
         return sortTasksByPriority(tasks);
      case 'name':
         return sortTasksByName(tasks);
      case 'creation-date':
         return sortTasksByCreationDate(tasks);
      case 'duration':
         return sortTasksByDuration(tasks);
      default:
         throw new Error('Wrong method for sorting tasks');
   }
}

function sortTasksByPriority(tasks) {
   return tasks.toSorted((task1, task2) => task2.priority - task1.priority);
}

function sortTasksByDuration(tasks) {
   return tasks.toSorted((task1, task2) => task2.duration - task1.duration);
}

function sortTasksByName(tasks) {
   return tasks.toSorted((task1, task2) =>
      compareStrings(task1.name, task2.name),
   );
}

function sortTasksByCreationDate(tasks) {
   console.warn('sortTasksByCreationDate not implemented yet');
   return tasks;
}

function compareStrings(str1, str2) {
   return str1.localeCompare(str2, undefined, {
      sensitivity: 'base',
      numeric: true,
   });
}
