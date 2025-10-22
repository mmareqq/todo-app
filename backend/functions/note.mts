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
         const noteUpdates = cleanUndefined(z_NoteUpdate.parse(event.body));
         await MUTATIONS.updateNote(noteId, noteUpdates);
      }
      if (event.httpMethod === 'DELETE') {
         await MUTATIONS.deleteNote(noteId);
      }
      throw new Error(
         `this url only accepts PATCH or DELETE http methods. url: ${event.rawUrl}`,
      );
   } catch (err) {
      console.log(err);
      throw err;
   }
};
