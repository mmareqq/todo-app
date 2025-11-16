import { useQuery } from '@tanstack/react-query';
import type { Task, Id } from '@frontend/data/types';
import { getFetchRequest, fetchJSON } from '@frontend/utils/fetch';
import useSettingsContext from '@hooks/useSettingsContext';
import { sortTasks } from '@frontend/utils/tasks';
import { getTasksQueryKey } from '@frontend/utils/getTasksQueryKey';
import { useAuth } from '@clerk/clerk-react';

export const useTasksQuery = (projectId: Id) => {
   const { settings } = useSettingsContext();
   const select = (tasks: Task[]) => sortTasks(tasks, settings.sortMethod);
   const { getToken } = useAuth();
   return useQuery({
      queryKey: getTasksQueryKey(projectId),
      queryFn: async (): Promise<Task[]> => {
         const token = await getToken();
         if (!token) throw new Error('Cannot generate token. Probably no user');
         try {
            const req = getFetchRequest(
               `/api/projects/${encodeURIComponent(projectId)}/tasks`,
               'GET',
               token,
            );
            const json = await fetchJSON(req);
            return json;
         } catch (err) {
            console.log(err);
            throw err;
         }
      },
      select,
   });
};

export const useTasksDurationQuery = (projectId: Id) => {
   const select = (data: Task[]) => {
      return data.reduce((acc, task) => acc + task.duration, 0);
   };
   const { getToken } = useAuth();
   return useQuery({
      queryKey: getTasksQueryKey(projectId),
      queryFn: async (): Promise<Task[]> => {
         const token = await getToken();
         if (!token) throw new Error('Cannot generate token. Probably no user');
         const req = getFetchRequest(
            `/api/projects/${projectId}/tasks`,
            'GET',
            token,
         );
         const json = await fetchJSON(req);
         return json;
      },
      select,
   });
};
