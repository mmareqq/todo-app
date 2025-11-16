import pool from './connection';
import type {
   ProjectCreate,
   TaskCreate,
   NoteCreate,
   ProjectUpdate,
   TaskUpdate,
   NoteUpdate,
   Id,
   TaskDB,
} from '@types';

import { transformToDB } from 'backend/utils/transformDB';

export const MUTATIONS = {
   addProject: (project: ProjectCreate) => {
      const { name, type, user_id } = project;
      return pool.query(
         'INSERT INTO `projects` (`name`, `type`, `user_id`) VALUES (?,?,?)',
         [name, type, user_id],
      );
   },
   addTask: (task: TaskCreate) => {
      const taskDB: TaskDB = transformToDB(task);
      const keys = Object.keys(taskDB);
      const values = Object.values(task);
      const keysClause = keys.map(k => `\`${k}\``).join(', ');
      const valuesClause = new Array(keys.length).fill('?').join(', ');

      return pool.query(
         `INSERT INTO tasks (${keysClause}) VALUES (${valuesClause})`,
         [...values],
      );
   },
   addNote: (note: NoteCreate) => {
      const keys = Object.keys(note);
      const values = Object.values(note);
      const keysClause = keys.map(k => `\`${k}\``).join(', ');
      const valuesClause = new Array(keys.length).fill('?').join(', ');
      return pool.query(
         `INSERT INTO notes (${keysClause}) VALUES (${valuesClause})`,
         [...values],
      );
   },

   deleteProject: (projectId: Id) =>
      pool.query('DELETE FROM `projects` WHERE `id`=?', [projectId]),
   deleteTask: (taskId: Id) =>
      pool.query('DELETE FROM `tasks` WHERE `id`=?', [taskId]),
   deleteTasksFromProject: (projectId: Id) =>
      pool.query('DELETE FROM `tasks` WHERE `project_id`=?', [projectId]),
   deleteNote: (noteId: Id) =>
      pool.query('DELETE FROM `notes` WHERE `id`=?', [noteId]),
   deleteAllNotes: () => pool.query('DELETE FROM `notes`'),

   updateProject: (id: Id, proj: ProjectUpdate) =>
      updateElement(id, proj, 'projects'),
   updateTask: (id: Id, task: TaskUpdate) => updateElement(id, task, 'tasks'),
   updateNote: (id: Id, note: NoteUpdate) => updateElement(id, note, 'notes'),
};

const updateElement = <T extends Record<string, T[keyof T]>>(
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
   getProjectsFromUser: (userId: string) =>
      pool.query(
         'SELECT * FROM projects WHERE user_id=? ORDER BY `created_at` ASC',
         [userId],
      ),
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
         'SELECT * FROM tasks WHERE DATE(due_date) = ? ORDER BY `due_date` ASC, `created_at` ASC',
         [date],
      ),
   getNotes: () => pool.query('SELECT * FROM notes ORDER BY `created_at` ASC'),
   getUserInboxProject: (userId: string) =>
      pool.query('SELECT * FROM projects WHERE user_id=? AND `type`="preset"', [
         userId,
      ]),
   getProject: (id: Id) =>
      pool.query('SELECT * FROM projects WHERE id=?', [id]),
};
// Update all fields at once
