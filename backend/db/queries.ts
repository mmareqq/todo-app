import pool from './connection';
import type { Id } from '@types';

const QUERIES = {
   getProjectsFromUser: (userId: string) =>
      pool.query(
         'SELECT `id`, `name`, `type` FROM projects WHERE user_id=? AND `type`="custom" ORDER BY `created_at` ASC',
         [userId],
      ),
   getTasksByProjectId: (projectId: Id) =>
      pool.query(
         'SELECT * FROM tasks WHERE project_id=? ORDER BY `created_at` ASC',
         [projectId],
      ),
   getTasksWithDate: (userId: string) =>
      pool.query(
         'SELECT * FROM tasks WHERE due_date IS NOT NULL AND user_id=? ORDER BY `created_at` ASC',
         [userId],
      ),
   getTasksFromDate: (date: string, userId: string) =>
      pool.query(
         'SELECT * FROM tasks WHERE DATE(due_date) = ? AND user_id=? ORDER BY `due_date` ASC, `created_at` ASC',
         [date, userId],
      ),
   getNotes: (userId: string) =>
      pool.query(
         'SELECT * FROM notes WHERE user_id=? ORDER BY `created_at` ASC',
         [userId],
      ),
   getUserInboxProject: (userId: string) =>
      pool.query(
         'SELECT `id`, `name`, `type` FROM projects WHERE user_id=? AND `type`="preset"',
         [userId],
      ),
   getProject: (id: Id) =>
      pool.query('SELECT * FROM projects WHERE id=?', [id]),
};

export default QUERIES;
