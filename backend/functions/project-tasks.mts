import { QUERIES } from '../db/queries';
import { Task, Id, z_TaskDB } from '@types';
import { transformFromDB } from 'backend/utils/transformDB';
import { array } from 'zod';
import { getProjectParam } from 'backend/utils/getParams';
import type { Handler, HandlerEvent } from '@netlify/functions';
import { appProjects } from '@shared/data/data';
import { formatDate } from '@shared/data/utils/formatDate';

const ENDPOINT_PATH = '/api/projects/:projectId/tasks';

export const handler: Handler = async (event: HandlerEvent) => {
   try {
      const projectId = getProjectParam(ENDPOINT_PATH, event.path);
      let tasks;
      if (projectId === appProjects.today.id) tasks = await getTodayTasks();
      else if (projectId === appProjects.upcoming.id) {
         tasks = await getTasksWithDate();
      } else {
         tasks = await getProjectTasks(projectId);
      }

      return {
         statusCode: 200,
         body: JSON.stringify(tasks),
      };
   } catch (err) {
      console.log(err);
      throw err;
   }
};

const getTodayTasks = async () => {
   const today = formatDate(new Date());
   const [rows] = await QUERIES.getTasksFromDate(today);
   const tasks = parseTasks(rows);
   return tasks;
};

const getTasksWithDate = async () => {
   const [rows] = await QUERIES.getTasksWithDate();
   const tasks = parseTasks(rows);
   return tasks;
};

const getProjectTasks = async (projectId: Id) => {
   const [rows] = await QUERIES.getTasksByProjectId(projectId);
   const tasks = parseTasks(rows);
   return tasks;
};

const parseTasks = (rows: unknown): Task[] => {
   return array(z_TaskDB)
      .parse(rows)
      .map(task => transformFromDB(task));
};
