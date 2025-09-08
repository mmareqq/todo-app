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
         'INSERT INTO `tasks` (`projectId`, `name`, `completed`, `priority`, `duration`, `dueDate`) VALUES (?, ?, ?, ?, ?, ?)',
         [projectId, name, completed, priority, duration, dueDate],
      );
   },
   addNote: (note: NoteCreate) => {
      const { title, description, color, x, y, size } = note;
      return pool.query(
         'INSERT INTO `projects` (`title`, `description`, `color`, `x`, `y`, `size`) VALUES (?, ?, ?, ?, ?, ?)',
         [title, description, color, x, y, size],
      );
   },

   deleteProject: (projectId: Id) =>
      pool.query('DELETE FROM `projects` WHERE `id`=?', [projectId]),
   deleteTask: (taskId: Id) =>
      pool.query('DELETE FROM `projects` WHERE `id`=?', [taskId]),
   deleteNote: (noteId: Id) =>
      pool.query('DELETE FROM `projects` WHERE `id`=?', [noteId]),

   updateProject: (id: Id, proj: ProjectUpdate) => updateElement(id, proj),
   updateTask: (id: Id, task: TaskUpdate) => updateElement(id, task),
   updateNote: (id: Id, note: NoteUpdate) => updateElement(id, note),
};

const updateElement = <T extends object>(id: Id, updates: T) => {
   const fieldsToUpdate = Object.keys(updates) as (keyof T)[];
   if (!fieldsToUpdate.length) {
      console.warn('no values provided to update task');
      return;
   }
   const setClause = fieldsToUpdate
      .map(field => `\`${String(field)}\` = ?`)
      .join(', ');
   const values: (T[keyof T] | Id)[] = fieldsToUpdate.map(
      field => updates[field],
   );
   values.push(id);
   return pool.query(`UPDATE tasks SET ${setClause} WHERE id=?`, values);
};

export const QUERIES = {
   getAllProjects: () => pool.query('SELECT * FROM projects'),
   getTasksByProjectId: (id: Id) =>
      pool.query('SELECT * FROM tasks WHERE project_id=?', [id]),
   getNotes: () => pool.query('SELECT * FROM notes'),
};
// Update all fields at once
//
