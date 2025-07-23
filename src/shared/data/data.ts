import generateId from '@utils/generateId';
import type {
   Settings,
   TaskPayload,
   Project,
   ProjectPayload,
   Note,
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

const exampleNote: Note = {
   id: '1234--er-sdf-ads',
   title: 'Mitochondrium',
   description:
      'Otoczone dwiema błonami organellum, obecne w większości komórek eukariotycznych. copy btn, edit btn, delete btn',
   x: 150,
   y: 300,
   width: 200,
   height: 200,
   color: 'lime',
};

export {
   initialSettings,
   appProjects,
   taskModel,
   projectModel,
   priorityColors,
   durationValues,
   defaultProjectId,
   exampleNote,
};
