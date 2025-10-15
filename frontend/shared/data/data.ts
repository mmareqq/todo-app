import type { Settings, TaskPayload, ProjectPayload } from './types';

const taskModel: TaskPayload = {
   name: '',
   priority: 'none',
   duration: 0,
   dueDate: null,
};

const projectModel: ProjectPayload = { name: '' };

const priorityColors = {
   none: 'text-priority-0',
   low: 'text-priority-1',
   medium: 'text-priority-2',
   high: 'text-priority-3',
} as const;

const durationValues = [0, 5, 10, 15, 30, 45, 60, 90];

const noteColors = {
   red: '#C61B1B',
   orange: '#F76300',
   yellow: '#FFDB26',
   green: '#2A9A35',
   blue: '#0978F6',
   purple: '#921EFF',
} as const;

const noteSizes = {
   sm: { w: 150, h: 150 },
   md: { w: 200, h: 200 },
   lg: { w: 250, h: 250 },
   xl: { w: 300, h: 300 },
} as const;

const appProjects = {
   inbox: { id: -1, name: 'Inbox', type: 'preset' },
   today: { id: -2, name: 'Today', type: 'preset' },
   upcoming: { id: -3, name: 'Upcoming', type: 'preset' },
   stickyBoard: { id: -4, name: 'StickyBoard', type: 'preset' },
} as const;

const defaultProjectId = appProjects.today.id;

const noteAddOffset = { x: 150, y: 50 } as const;

const initialSettings: Settings = {
   activeProjectId: appProjects.today.id,
   sortMethod: 'priority',
   theme: 'dark',
};

export {
   initialSettings,
   taskModel,
   projectModel,
   priorityColors,
   durationValues,
   defaultProjectId,
   noteSizes,
   noteColors,
   appProjects,
   noteAddOffset,
};
