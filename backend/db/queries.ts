import pool from './connection';
export const QUERIES = {
   getUsers: () => pool.query('SELECT * FROM users'),
   getProjectById: (id: bigint) =>
      pool.query('SELECT * FROM projects WHERE id=?', [id]),
   getTasksById: (id: bigint) =>
      pool.query('SELECT * FROM tasks WHERE project_id=?', [id]),
};

export const MUTATIONS = {};
