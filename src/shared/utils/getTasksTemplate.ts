import generateId from './generateId';
import type { Task } from '@data/types';

const getTasksTemplate = (projectId: string): Task[] => {
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

export default getTasksTemplate;
