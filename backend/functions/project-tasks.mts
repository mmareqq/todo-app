import QUERIES from '../db/queries';
import { Task, Id, z_TaskDB } from '@types';
import { transformFromDB } from 'backend/utils/transformDB';
import { array } from 'zod';
import { getProjectParam } from 'backend/utils/getParams';
import type { Handler, HandlerEvent } from '@netlify/functions';
import { appProjects } from '@shared/data/data';
import { formatDate } from '@shared/data/utils/formatDate';
import getVerifiedUserId from 'backend/utils/getVerifiedUserId';

const ENDPOINT_PATH = '/api/projects/:projectId/tasks';

export const handler: Handler = async (event: HandlerEvent) => {
   try {
      const userId = await getVerifiedUserId(event.headers.authorization);
      const projectId = getProjectParam(ENDPOINT_PATH, event.path);
      let tasks;

      if (projectId === appProjects.today.id)
         tasks = await getTodayTasks(userId);
      else if (projectId === appProjects.upcoming.id) {
         tasks = await getTasksWithDate(userId);
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

const getTodayTasks = async (userId: string) => {
   const today = formatDate(new Date());
   const [rows] = await QUERIES.getTasksFromDate(today, userId);
   const tasks = parseTasks(rows);
   return tasks;
};

const getTasksWithDate = async (userId: string) => {
   const [rows] = await QUERIES.getTasksWithDate(userId);
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
