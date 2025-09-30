import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import type {
   Project,
   ProjectUpdate,
   TaskCreate,
   TaskUpdate,
   Task,
   Id,
} from '@types';
import { getFetchRequest, fetchJSON } from '@frontend/utils/fetch';

export const useProjectQuery = (projectId: Id) => {
   return useQuery<Project>({
      queryKey: ['project', projectId],
      queryFn: async () => {
         try {
            const req = getFetchRequest(`/api/projects/${projectId}`, 'GET');
            const json = await fetchJSON(req);
            console.log('project json', json);
            return json;
         } catch (err) {
            console.error(err);
         }
      },
   });
};

export const useTasksQuery = (projectId: Id) => {
   return useQuery<Task[]>({
      queryKey: ['tasks', projectId],
      queryFn: async () => {
         try {
            const req = getFetchRequest(
               `/api/projects/${projectId}/tasks`,
               'GET',
            );
            const json = await fetchJSON(req);
            return json;
         } catch (err) {
            console.error(err);
         }
      },
   });
};

export const useTasksWithDateQuery = () => {
   return useQuery<Task[]>({
      queryKey: ['tasks', 'tasks-with-date'],
      queryFn: async () => {
         const req = getFetchRequest(`/api/tasks`, 'GET');
         const json = await fetchJSON(req);
         return json;
      },
   });
};

export const useTodayTasksQuery = () => {
   return useQuery<Task[]>({
      queryKey: ['tasks', 'tasks-today'],
      queryFn: async () => {
         const req = getFetchRequest(`/api/tasks/today`, 'GET');
         const json = await fetchJSON(req);
         console.log('today tasks json', json);
         return json;
      },
   });
};

export const useEditProjectMutation = (projectId: Id) => {
   const client = useQueryClient();

   return useMutation({
      mutationFn: async (project: ProjectUpdate) => {
         const req = getFetchRequest(
            `/api/projects/${projectId}`,
            'PATCH',
            project,
         );
         await fetch(req);
      },

      onSuccess: () => {
         client.invalidateQueries({ queryKey: ['project'] });
         client.invalidateQueries({ queryKey: ['projects'] });
      },
   });
};

export const useAddTaskMutation = () => {
   const client = useQueryClient();

   return useMutation({
      mutationKey: ['addTask'],
      mutationFn: async (task: TaskCreate) => {
         const req = getFetchRequest('/api/tasks', 'POST', {
            ...task,
            dueDate: task.dueDate?.toISOString() || null,
         });
         await fetch(req);
      },

      onSuccess: () => {
         client.invalidateQueries({ queryKey: ['tasks'] });
      },
   });
};

export const useRemoveTaskMutation = (taskId: Id) => {
   const client = useQueryClient();

   return useMutation({
      mutationKey: ['removeTask', taskId],
      mutationFn: async () => {
         const req = getFetchRequest(`/api/tasks/${taskId}`, 'DELETE');
         await fetch(req);
      },

      onSuccess: () => {
         client.invalidateQueries({ queryKey: ['tasks'] });
      },
   });
};

export const useRemoveProjectMutation = (projectId: Id) => {
   const client = useQueryClient();

   return useMutation({
      mutationKey: ['removeTask', projectId],
      mutationFn: async () => {
         const req = getFetchRequest(`/api/projects/${projectId}`, 'DELETE');
         await fetch(req);
      },

      onSuccess: () => {
         client.invalidateQueries({ queryKey: ['projects'] });
      },
   });
};

export const useEditTaskMutation = (taskId: Id) => {
   const client = useQueryClient();

   return useMutation({
      mutationKey: ['editTask', taskId],
      mutationFn: async (editedTask: TaskUpdate) => {
         const req = getFetchRequest(`/api/tasks/${taskId}`, 'PATCH', {
            ...editedTask,
            dueDate: editedTask.dueDate
               ? editedTask.dueDate.toISOString()
               : null,
         });
         await fetch(req);
      },

      onSuccess: () => {
         client.invalidateQueries({ queryKey: ['tasks'] });
      },
   });
};
