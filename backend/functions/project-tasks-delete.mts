import { MUTATIONS } from '../db/queries';
import { getTaskParam } from 'backend/utils/getParams';
import type { Handler, HandlerEvent } from '@netlify/functions';

const ENDPOINT_PATH = '/api/projects/:projectId/tasks';

export const handler: Handler = async (event: HandlerEvent) => {
   try {
      const taskId = getTaskParam(ENDPOINT_PATH, event.path);
      await MUTATIONS.deleteTasksFromProject(taskId);
      return {
         statusCode: 200,
         body: JSON.stringify(''),
      };
   } catch (err) {
      console.log(err);
      throw err;
   }
};
