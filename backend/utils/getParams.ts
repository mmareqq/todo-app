import { ZodObject } from 'zod';
import { z_projectParam, z_taskParam, z_noteParam } from '@types';
import { parseId } from './parse';

export const getParams = <T extends ZodObject>(
   pathTemplate: string,
   path: string,
   zodSchema: T,
) => {
   const params: Record<string, string> = {};
   const urlParts = path.split('/');
   const templateParts = pathTemplate.split('/');

   templateParts.forEach((part, i) => {
      if (part.startsWith(':') && urlParts[i] !== undefined) {
         params[part.slice(1)] = urlParts[i];
      }
   });
   const result = zodSchema.safeParse(params);
   if (!result.success) {
      console.log(result.error.issues);
      throw result.error;
   }
   return result.data;
};

export const getProjectParam = (endpointUrl: string, url: string) => {
   const { projectId } = getParams(endpointUrl, url, z_projectParam);
   return parseId(projectId);
};

export const getTaskParam = (endpointUrl: string, url: string) => {
   const { taskId } = getParams(endpointUrl, url, z_taskParam);
   return parseId(taskId);
};

export const getNoteParam = (endpointUrl: string, url: string) => {
   const { noteId } = getParams(endpointUrl, url, z_noteParam);
   return parseId(noteId);
};
