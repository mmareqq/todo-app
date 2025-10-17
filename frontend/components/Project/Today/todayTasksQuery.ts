import { useQuery } from '@tanstack/react-query';
import type { Task } from '@types';
import { getFetchRequest, fetchJSON } from '@frontend/utils/fetch';
import { appProjects } from '@frontend/data/data';
import { getTasksQueryKey } from '@frontend/utils/getTasksQueryKey';

export const useTodayTasksQuery = () => {
   return useQuery({
      queryKey: getTasksQueryKey(appProjects.today.id),
      queryFn: async (): Promise<Task[]> => {
         const req = getFetchRequest(`/api/tasks/today`, 'GET');
         const json = await fetchJSON(req);
         return json;
      },
   });
};

export const useTodayTasksDuration = () => {
   const select = (data: Task[]) => {
      return data.reduce((acc, task) => acc + task.duration, 0);
   };

   return useQuery({
      queryKey: getTasksQueryKey(appProjects.today.id),
      queryFn: async (): Promise<Task[]> => {
         const req = getFetchRequest(`/api/tasks/today`, 'GET');
         const json = await fetchJSON(req);
         return json;
      },
      select,
   });
};
