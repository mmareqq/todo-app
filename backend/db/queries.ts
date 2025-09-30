import pool from './connection';
import type {
   ProjectCreate,
   TaskCreate,
   NoteCreate,
   ProjectUpdate,
   TaskUpdate,
   NoteUpdate,
   Id,
} from '@types';

import { transformToDB } from 'backend/utils/transformDB';

export const MUTATIONS = {
   addProject: (project: ProjectCreate) => {
      const { name } = project;
      return pool.query('INSERT INTO `projects` (`name`) VALUES (?)', [name]);
   },
   addTask: (task: TaskCreate) => {
      const { projectId, name, completed, priority, duration, dueDate } = task;
      return pool.query(
         'INSERT INTO `tasks` (`project_id`, `name`, `completed`, `priority`, `duration`, `due_date`) VALUES (?, ?, ?, ?, ?, ?)',
         [projectId, name, completed, priority, duration, dueDate],
      );
   },
   addNote: (note: NoteCreate) => {
      const { title, description, color, x, y, size } = note;
      return pool.query(
         'INSERT INTO `notes` (`title`, `description`, `color`, `x`, `y`, `size`) VALUES (?, ?, ?, ?, ?, ?)',
         [title, description, color, x, y, size],
      );
   },

   deleteProject: (projectId: Id) =>
      pool.query('DELETE FROM `projects` WHERE `id`=?', [projectId]),
   deleteTask: (taskId: Id) =>
      pool.query('DELETE FROM `tasks` WHERE `id`=?', [taskId]),
   deleteNote: (noteId: Id) =>
      pool.query('DELETE FROM `notes` WHERE `id`=?', [noteId]),

   updateProject: (id: Id, proj: ProjectUpdate) =>
      updateElement(id, proj, 'projects'),
   updateTask: (id: Id, task: TaskUpdate) => updateElement(id, task, 'tasks'),
   updateNote: (id: Id, note: NoteUpdate) => updateElement(id, note, 'notes'),
};

const updateElement = <T extends object>(
   id: Id,
   updates: T,
   tableName: 'projects' | 'tasks' | 'notes',
) => {
   const dbUpdates = transformToDB(updates);
   const keys = Object.keys(dbUpdates);
   const values: T[keyof T][] = Object.values(dbUpdates);

   const SETClause = keys.map(key => `${key} = ?`).join(', ');

   return pool.query(`UPDATE ${tableName} SET ${SETClause} WHERE id=?`, [
      ...values,
      id,
   ]);
};

export const QUERIES = {
   getAllProjects: () =>
      pool.query('SELECT * FROM projects ORDER BY `created_at` ASC'),
   getTasksByProjectId: (id: Id) =>
      pool.query(
         'SELECT * FROM tasks WHERE project_id=? ORDER BY `created_at` ASC',
         [id],
      ),
   getTasksWithDate: () =>
      pool.query(
         'SELECT * FROM tasks WHERE due_date IS NOT NULL ORDER BY `created_at` ASC',
      ),
   getTasksFromDate: (date: string) =>
      pool.query(
         'SELECT * FROM tasks WHERE due_date = ? ORDER BY `created_at` ASC',
         [date],
      ),
   getNotes: () => pool.query('SELECT * FROM notes ORDER BY `created_at` ASC'),
   getProject: (id: Id) =>
      pool.query('SELECT * FROM projects WHERE id=?', [id]),
};
// Update all fields at once
//
