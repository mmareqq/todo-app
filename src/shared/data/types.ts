import { initialSettings } from './data';
import type { ReactNode } from 'react';
import type { UpdateValue } from './helperTypes';

type Children = { children?: ReactNode };

type Project = {
   readonly id: string;
   name: string;
   readonly editable: boolean;
   readonly createdByUser: boolean;
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

type Dialog = {
   isOpen: boolean;
   openDialog: () => void;
   closeDialog: () => void;
};

type Settings = typeof initialSettings;

type SettingsContext = {
   settings: Settings;
   updateSetting: UpdateValue<Settings>;
};

export { Children, Task, Project, Dialog, Settings, SettingsContext };
