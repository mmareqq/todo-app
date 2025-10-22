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
         const taskUpdates = cleanUndefined(z_TaskUpdate.parse(event.body));
         await MUTATIONS.updateTask(taskId, taskUpdates);
      } else if (event.httpMethod === 'DELETE') {
         await MUTATIONS.deleteTask(taskId);
      } else {
         throw new Error(
            `this endpoint accepts only PATCH or DELETE methods. url: ${event.rawUrl}`,
         );
      }

      return { statusCode: 200 };
   } catch (err) {
      console.log(err);
      throw err;
   }
};

const deleteTask = async () => {};
