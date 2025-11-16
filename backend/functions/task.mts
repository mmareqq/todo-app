import { MUTATIONS } from '../db/queries';
import { z_TaskUpdate } from '@types';
import type { Handler, HandlerEvent } from '@netlify/functions';
import { getTaskParam } from 'backend/utils/getParams';
import cleanUndefined from 'backend/utils/cleanUndefined';

const ENDPOINT_PATH = '/api/tasks/:taskId';

export const handler: Handler = async (event: HandlerEvent) => {
   try {
      const taskId = getTaskParam(ENDPOINT_PATH, event.path);
      if (event.httpMethod === 'PATCH') {
         if (!event.body) throw Error('no body for PATCH');
         const body = JSON.parse(event.body);
         const taskUpdates = cleanUndefined(z_TaskUpdate.parse(body));
         await MUTATIONS.updateTask(taskId, taskUpdates);
         return { statusCode: 200 };
      }
      if (event.httpMethod === 'DELETE') {
         await MUTATIONS.deleteTask(taskId);
         return { statusCode: 200 };
      }

      throw Error(
         `this endpoint accepts only PATCH or DELETE methods. url: ${event.rawUrl}`,
      );
   } catch (err) {
      console.log(err);
      throw err;
   }
};
