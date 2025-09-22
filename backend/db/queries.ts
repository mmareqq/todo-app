import type {
   ProjectCreate,
   TaskCreate,
   NoteCreate,
   ProjectUpdate,
   TaskUpdate,
   NoteUpdate,
   Id,
} from '@types';
import pool from './connection';

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

const toSnakeCase = (s: string) =>
   s
      .replace(/([A-Z])/g, '_$1')
      .replace(/[^a-z0-9_]/gi, '_')
      .toLowerCase();

const updateElement = <T extends Record<string, T[keyof T]>>(
   id: Id,
   updates: T,
   tableName: 'projects' | 'tasks' | 'notes',
) => {
   type Value = T[keyof T];
   const entries = Object.entries(updates).filter(([, v]) => v !== undefined);
   if (!entries.length) {
      console.warn('no values provided to update task');
      return Promise.resolve([]);
   }
   const setClause = entries
      .map(([key]) => `\`${toSnakeCase(key)}\` = ?`)
      .join(', ');

   const values: (Value | Id)[] = entries.map(([, v]) => v);
   values.push(id);

   return pool.query(`UPDATE ${tableName} SET ${setClause} WHERE id=?`, values);
};

export const QUERIES = {
   getAllProjects: () =>
      pool.query('SELECT * FROM projects ORDER BY `created_at` ASC'),
   getTasksByProjectId: (id: Id) =>
      pool.query(
         'SELECT * FROM tasks WHERE project_id=? ORDER BY `created_at` ASC',
         [id],
      ),
   getNotes: () => pool.query('SELECT * FROM notes ORDER BY `created_at` ASC'),
   getProject: (id: Id) =>
      pool.query('SELECT * FROM projects where id=?', [id]),
};
// Update all fields at once
//
