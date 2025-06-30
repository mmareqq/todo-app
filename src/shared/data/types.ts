import type { ReactNode } from 'react';
import type { UpdateValue } from './helperTypes';

type Children = { children?: ReactNode };

type SortMethod =
   | 'priority'
   | 'name'
   | 'creation-date'
   | 'duration'
   | 'groupByDate';

type Project = {
   readonly id: string;
   name: string;
   readonly editable: boolean;
   readonly createdByUser: boolean;
};

type ProjectActions = {
   project: Project;
   addProject: (newProject: Project) => void;
   editProject: (newProject: Project) => void;
   removeProject: (id: Project['id']) => void;
};

type Task = {
   readonly id: string;
   finished: boolean;
   name: string;
   priority: number;
   duration: number;
   date: string | null;
   readonly createdAt: string;
};

type TaskActions = {
   task: Task;
   addTask: (newTask: Task) => void;
   editTask: (newTask: Task) => void;
   removeTask: (id: Task['id']) => void;
};

type Dialog = {
   isOpen: boolean;
   openDialog: () => void;
   closeDialog: () => void;
};

type Settings = {
   sortMethod: SortMethod;
   theme: 'light' | 'dark';
};

type SettingsContext = {
   settings: Settings;
   updateSetting: UpdateValue<Settings>;
};

export {
   Children,
   Project,
   ProjectActions,
   Task,
   TaskActions,
   Dialog,
   Settings,
   SortMethod,
   SettingsContext,
};
