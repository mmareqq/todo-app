import { MUTATIONS } from '../db/queries';
import type { Handler, HandlerEvent } from '@netlify/functions';
import { z_TaskCreate } from '@types';

export const handler: Handler = async (event: HandlerEvent) => {
   try {
      if (!event.body) throw new Error('no body for PATCH');
      const body = JSON.parse(event.body);
      const task = z_TaskCreate.parse(body);
      console.log('adding task', task);
      await MUTATIONS.addTask(task);

      return { statusCode: 200 };
   } catch (err) {
      console.log(err);
      throw err;
   }
};
