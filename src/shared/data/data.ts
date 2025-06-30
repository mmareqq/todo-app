import generateId from '@utils/generateId';
import type {
   Settings,
   TaskPayload,
   Task,
   Project,
   ProjectPayload,
} from './types';

const initialSettings: Settings = {
   sortMethod: 'priority',
   theme: 'dark',
};

// Only for dev, to be deleted
const tasksTemplate: Task[] = [
   {
      id: generateId(),
      finished: false,
      name: 'Task 1',
      priority: 2,
      duration: 15,
      date: null,
      createdAt: new Date().toISOString(),
   },
   {
      id: generateId(),
      finished: false,
      name: 'Task 2',
      priority: 0,
      duration: 90,
      date: null,
      createdAt: new Date().toISOString(),
   },
   {
      id: generateId(),
      finished: false,
      name: 'Task 3',
      priority: 1,
      duration: 45,
      date: null,
      createdAt: new Date().toISOString(),
   },
   {
      id: generateId(),
      finished: false,
      name: 'Task 4',
      priority: 2,
      duration: 15,
      date: null,
      createdAt: new Date().toISOString(),
   },
   {
      id: generateId(),
      finished: false,
      name: 'Task 5',
      priority: 3,
      duration: 5,
      date: null,
      createdAt: new Date().toISOString(),
   },
];

const taskModel: TaskPayload = {
   name: '',
   priority: 0,
   duration: 0,
   date: '',
};

const projectModel: ProjectPayload = { name: '' };

const appProjects: Project[] = [
   { id: 'today', name: 'Today', editable: false, createdByUser: false },
   {
      id: 'upcoming',
      name: 'Upcoming',
      editable: false,
      createdByUser: false,
   },
];

const priorityColors = [
   'text-priority-0',
   'text-priority-1',
   'text-priority-2',
   'text-priority-3',
];

const durationValues = [5, 10, 15, 30, 45, 60, 90];

export {
   initialSettings,
   tasksTemplate,
   appProjects,
   taskModel,
   projectModel,
   priorityColors,
   durationValues,
};
