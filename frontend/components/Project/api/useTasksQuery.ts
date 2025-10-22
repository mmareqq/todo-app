import { useQuery } from '@tanstack/react-query';
import type { Task, Id } from '@frontend/data/types';
import { getFetchRequest, fetchJSON } from '@frontend/utils/fetch';
import useSettingsContext from '@hooks/useSettingsContext';
import { sortTasks } from '@frontend/utils/tasks';
import { getTasksQueryKey } from '@frontend/utils/getTasksQueryKey';

export const useTasksQuery = (projectId: Id) => {
   const { settings } = useSettingsContext();
   const select = (tasks: Task[]) => sortTasks(tasks, settings.sortMethod);
   return useQuery({
      queryKey: getTasksQueryKey(projectId),
      queryFn: async (): Promise<Task[]> => {
         try {
            const req = getFetchRequest(
               `/api/projects/${encodeURIComponent(projectId)}/tasks`,
               'GET',
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

   return useQuery({
      queryKey: getTasksQueryKey(projectId),
      queryFn: async (): Promise<Task[]> => {
         const req = getFetchRequest(`/api/projects/${projectId}/tasks`, 'GET');
         const json = await fetchJSON(req);
         return json;
      },
      select,
   });
};
