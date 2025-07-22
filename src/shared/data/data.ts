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
   {
      id: 'sticky-board',
      name: 'Sticky Board',
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

const durationValues = [0, 5, 10, 15, 30, 45, 60, 90];

const defaultProjectId = 'today';

export {
   initialSettings,
   appProjects,
   taskModel,
   projectModel,
   priorityColors,
   durationValues,
   defaultProjectId,
};
