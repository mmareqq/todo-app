import { initialSettings } from './data';
import type { ReactNode } from 'react';

type Children = { children?: ReactNode };

type Project = {
   id: string;
   name: string;
   editable: boolean;
   createdByUser: boolean;
};

type Task = {
   id: string;
   finished: boolean;
   name: string;
   priority: number;
   duration: number;
   date: string | null;
   createdAt: string;
};

type Dialog = {
   isOpen: boolean;
   openDialog: () => void;
   closeDialog: () => void;
};

type Settings = typeof initialSettings;

type SettingsContext = {
   settings: Settings;
   updateSetting: <K extends keyof Settings>(
      name: K,
      value: Settings[K],
   ) => void;
};

export { Children, Task, Project, Dialog, Settings, SettingsContext };
