import MUTATIONS from 'backend/db/mutations';
import type { Handler, HandlerEvent } from '@netlify/functions';
import { z_TaskCreate } from '@types';
import getVerifiedUserId from 'backend/utils/getVerifiedUserId';

export const handler: Handler = async (event: HandlerEvent) => {
   try {
      const userId = await getVerifiedUserId(event.headers.authentication);
      if (!event.body) throw Error('no body for PATCH');
      const body = JSON.parse(event.body);
      const task = z_TaskCreate.parse(body);
      await MUTATIONS.addTask({ ...task, user_id: userId });

      return { statusCode: 200 };
   } catch (err) {
      console.log(err);
      throw err;
   }
};
