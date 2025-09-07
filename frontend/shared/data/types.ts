import type { ReactNode } from 'react';
import type { UpdateValue } from './helperTypes.ts';

type Children = { children?: ReactNode };

type SortMethod = 'priority' | 'name' | 'duration' | 'dueDate';

type Project = {
   readonly id: string;
   name: string;
   readonly type: 'custom' | 'preset';
};

type ProjectPayload = Pick<Project, 'name'>;

type ProjectActions = {
   project: Project;
   addProject: (newProject: Project) => void;
   editProject: (newProject: Project) => void;
   removeProject: (id: Project['id']) => void;
};

type Task = {
   readonly id: string;
   projectId: string;
   completed: boolean;
   name: string;
   priority: TaskPriority;
   duration: number;
   dueDate: string | null;
   readonly createdAt: string;
};

type TaskPriority = 'none' | 'low' | 'medium' | 'high';

type TaskPayload = Pick<Task, 'name' | 'priority' | 'duration' | 'dueDate'>;

type TaskActions = {
   task: Task;
   addTask: (newTask: Task) => void;
   editTask: (newTask: Task) => void;
   removeTask: (id: Task['id']) => void;
};

type Note = {
   readonly id: string;
   title: string;
   description: string;
   color: NoteColor;
   x: number;
   y: number;
   size: NoteSize;
};

type NoteSize = 'sm' | 'md' | 'lg' | 'xl';
type NotePayload = Pick<Note, 'title' | 'description'>;
type NoteColor = 'blue' | 'red' | 'green' | 'orange' | 'purple' | 'yellow';
type NoteActions = {
   note: Note;
   addNote: (newNote: Note) => void;
   editNote: (newNote: Note) => void;
   removeNote: (noteId: Note['id']) => void;
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
   TaskPriority,
   Dialog,
   Settings,
   SortMethod,
   SettingsContext,
   Note,
   NoteActions,
   NotePayload,
   NoteColor,
   NoteSize,
};
