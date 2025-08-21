import type { ReactNode } from 'react';
import type { UpdateValue } from './helperTypes.ts';

type Children = { children?: ReactNode };

type SortMethod = 'priority' | 'name' | 'duration' | 'date';

type Project = {
   readonly id: string;
   name: string;
   readonly editable: boolean;
   readonly createdByUser: boolean;
};

type ProjectPayload = Pick<Project, 'name'>;

type ProjectActions = {
   project: Project;
   addProject: (newProject: Project) => void;
   editProject: (newProject: Project) => void;
   removeProject: (id: Project['id']) => void;
};

type Note = {
   readonly id: string;
   title: string;
   description: string;
   color?: string;
   x: number;
   y: number;
   width: number;
   height: number;
};

type NotePayload = Pick<Note, 'title' | 'description'>;

type NoteActions = {
   note: Note;
   addNote: (newNote: Note) => void;
   editNote: (newNote: Note) => void;
   removeNote: (noteId: Note['id']) => void;
};

type Task = {
   readonly id: string;
   projectId: string;
   finished: boolean;
   name: string;
   priority: number;
   duration: number;
   date: string | null;
   readonly createdAt: string;
};

type TaskPayload = Pick<Task, 'name' | 'priority' | 'duration' | 'date'>;

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
   ProjectPayload,
   ProjectActions,
   Task,
   TaskPayload,
   TaskActions,
   Dialog,
   Settings,
   SortMethod,
   SettingsContext,
   Note,
   NoteActions,
   NotePayload,
};
