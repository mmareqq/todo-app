import pool from './connection';
export const QUERIES = {
   getAllProjects: () => pool.query('SELECT * FROM projects'),
   getProjectById: (id: bigint) =>
      pool.query('SELECT * FROM projects WHERE id=?', [id]),
   getTasksById: (id: bigint) =>
      pool.query('SELECT * FROM tasks WHERE project_id=?', [id]),
   getNotes: () => pool.query('SELECT * FROM notes'),
};

export const MUTATIONS = {
   addProject: (projectName: string) => {
      return pool.query('INSERT INTO projects (`name`) VALUES (?)', [
         projectName,
      ]);
   },
};
