import type { Id, Project } from '@types';

export const getTasksQueryKey = (projectId: Id) => {
   const type: Project['type'] = projectId < 0 ? 'preset' : 'custom';
   return ['tasks', type, projectId] as const;
};
