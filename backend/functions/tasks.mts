import { MUTATIONS } from '../db/queries';
import type { Handler, HandlerEvent } from '@netlify/functions';
import { z_TaskCreate } from '@types';

export const handler: Handler = async (event: HandlerEvent) => {
   try {
      const task = z_TaskCreate.parse(event.body);
      await MUTATIONS.addTask(task);
      return { statusCode: 200 };
   } catch (err) {
      console.log(err);
      throw err;
   }
};
