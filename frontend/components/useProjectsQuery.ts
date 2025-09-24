import { useQuery } from '@tanstack/react-query';
import getFullUrl from '@frontend/utils/getFullUrl';
import type { Project } from '@frontend/data/types';

const useProjectsQuery = () => {
   const projects = useQuery<Project[]>({
      queryKey: ['projects'],
      queryFn: async () => {
         const json = await fetch(getFullUrl('/api/projects'), {
            method: 'GET',
         }).then(res => res.json());
         return JSON.parse(json);
      },
   });

   return projects;
};

export default useProjectsQuery;
