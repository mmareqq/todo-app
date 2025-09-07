import type {
   Settings,
   TaskPayload,
   Project,
   ProjectPayload,
   NoteColor,
   NoteSize,
} from './types';

const initialSettings: Settings = {
   sortMethod: 'priority',
   theme: 'dark',
};

// Only for dev, to be deleted

const taskModel: TaskPayload = {
   name: '',
   priority: 'none',
   duration: 0,
   dueDate: '',
};

const projectModel: ProjectPayload = { name: '' };

const appProjects: Project[] = [
   { id: 'today', name: 'Today', type: 'preset' },
   {
      id: 'upcoming',
      name: 'Upcoming',
      type: 'preset',
   },
   {
      id: 'sticky-board',
      name: 'Sticky Board',
      type: 'preset',
   },
];

const priorityColors = {
   none: 'text-priority-0',
   low: 'text-priority-1',
   medium: 'text-priority-2',
   high: 'text-priority-3',
};

const durationValues = [0, 5, 10, 15, 30, 45, 60, 90];

const defaultProjectId = 'today';

const noteColors: Record<NoteColor, string> = {
   red: '#C61B1B',
   orange: '#F76300',
   yellow: '#FFDB26',
   green: '#2A9A35',
   blue: '#0978F6',
   purple: '#921EFF',
};

const noteSizes: Record<NoteSize, { w: number; h: number }> = {
   sm: { w: 150, h: 150 },
   md: { w: 200, h: 200 },
   lg: { w: 250, h: 250 },
   xl: { w: 300, h: 300 },
};

export {
   initialSettings,
   appProjects,
   taskModel,
   projectModel,
   priorityColors,
   durationValues,
   defaultProjectId,
   noteSizes,
   noteColors,
};
