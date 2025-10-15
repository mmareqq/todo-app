import type { ReactNode } from 'react';
import type { UpdateValue } from './helperTypes.ts';
import {
   Project,
   ProjectCreate,
   ProjectUpdate,
   Task,
   TaskCreate,
   TaskUpdate,
   Note,
   NoteUpdate,
   NoteCreate,
   Id,
} from '@types';

type ProjectType = 'custom' | 'upcoming' | 'today' | 'inbox';

type Children = { children?: ReactNode };

type SortMethod = 'priority' | 'name' | 'duration' | 'dueDate';

type ProjectPayload = Pick<Project, 'name'>;

type ProjectActions = {
   project: Project;
   addProject: (newProject: ProjectCreate) => void;
   editProject: (newProject: ProjectUpdate) => void;
   removeProject: (id: Project['id']) => void;
};

type TaskPayload = Pick<Task, 'name' | 'priority' | 'duration' | 'dueDate'>;

type TaskActions = {
   addTask: (newTask: TaskCreate) => void;
   editTask: (newTask: TaskUpdate) => void;
   removeTask: (id: Task['id']) => void;
};

type NotePayload = Pick<Note, 'title' | 'description'>;

type NoteActions = {
   note: Note;
   addNote: (newNote: NoteCreate) => void;
   editNote: (newNote: NoteUpdate) => void;
   removeNote: (noteId: Note['id']) => void;
};

type Dialog = {
   isOpen: boolean;
   openDialog: () => void;
   closeDialog: () => void;
};

type Settings = {
   activeProjectId: Id;
   sortMethod: SortMethod;
   theme: 'light' | 'dark';
};

type SettingsContext = {
   settings: Settings;
   updateSetting: UpdateValue<Settings>;
};

export {
   Children,
   ProjectPayload,
   ProjectActions,
   TaskPayload,
   TaskActions,
   Dialog,
   Settings,
   SortMethod,
   SettingsContext,
   NoteActions,
   NotePayload,
   ProjectType,
};

export * from '@types';
