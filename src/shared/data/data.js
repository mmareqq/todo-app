import generateId from '@utils/generateId';

const initialSettings = {
   sortMethod: 'priority',
   theme: 'dark',
};

// Only for dev, to be deleted
const tasksTemplate = [
   {
      id: generateId(),
      finished: false,
      name: 'Task 1',
      priority: 2,
      duration: 15,
      date: null,
      createdAt: new Date(),
   },
   {
      id: generateId(),
      finished: false,
      name: 'Task 2',
      priority: 0,
      duration: 90,
      date: null,
      createdAt: new Date(),
   },
   {
      id: generateId(),
      finished: false,
      name: 'Task 3',
      priority: 1,
      duration: 45,
      date: null,
      createdAt: new Date(),
   },
   {
      id: generateId(),
      finished: false,
      name: 'Task 4',
      priority: 2,
      duration: 15,
      date: null,
      createdAt: new Date(),
   },
   {
      id: generateId(),
      finished: false,
      name: 'Task 5',
      priority: 3,
      duration: 5,
      date: null,
      createdAt: new Date(),
   },
];

const taskModel = {
   name: '',
   priority: 0,
   duration: 0,
   date: '',
};

const projectModel = { name: '' };

const appProjects = [
   { id: 'today', name: 'Today', editable: false, createdByUser: false },
   {
      id: 'upcoming',
      name: 'Upcoming',
      editable: false,
      createdByUser: false,
   },
];

export { initialSettings, tasksTemplate, appProjects, taskModel, projectModel };
