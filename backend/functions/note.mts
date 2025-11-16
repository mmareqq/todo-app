import type { Handler, HandlerEvent } from '@netlify/functions';
import { MUTATIONS } from '../db/queries';
import { z_NoteUpdate } from '@types';
import { getNoteParam } from 'backend/utils/getParams';
import cleanUndefined from 'backend/utils/cleanUndefined';
const ENDPOINT_PATH = '/api/notes/:noteId';
export const handler: Handler = async (event: HandlerEvent) => {
   try {
      const noteId = getNoteParam(ENDPOINT_PATH, event.path);

      if (event.httpMethod === 'PATCH') {
         if (!event.body) throw Error('no body for PATCH');
         const body = JSON.parse(event.body);
         const noteUpdates = cleanUndefined(z_NoteUpdate.parse(body));
         await MUTATIONS.updateNote(noteId, noteUpdates);
         return { statusCode: 200 };
      }

      if (event.httpMethod === 'DELETE') {
         await MUTATIONS.deleteNote(noteId);
         return { statusCode: 200 };
      }

      throw Error(
         `this url only accepts PATCH or DELETE http methods. url: ${event.rawUrl}`,
      );
   } catch (err) {
      console.log(err);
      throw err;
   }
};
