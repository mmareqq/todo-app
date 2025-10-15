import { useQuery } from '@tanstack/react-query';
import type { Task } from '@types';
import { getFetchRequest, fetchJSON } from '@frontend/utils/fetch';
import { appProjects } from '@frontend/data/data';

export const useTodayTasksQuery = () => {
   return useQuery({
      queryKey: ['tasks', appProjects.today.id],
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
      queryKey: ['tasks', appProjects.today.id],
      queryFn: async (): Promise<Task[]> => {
         const req = getFetchRequest(`/api/tasks/today`, 'GET');
         const json = await fetchJSON(req);
         return json as Task[];
      },
      select,
   });
};
