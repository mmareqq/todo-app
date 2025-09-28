import UserProject from './UserProject';
import UpcomingProject from './UpcomingProject';
import TodayProject from './TodayProject';
import StickyBoard from '@components/StickyBoard';
import type { Id } from '@types';

const Project = ({ projectId }: { projectId: Id }) => {
   if (projectId === 1) return <TodayProject />;
   if (projectId === 2) return <UpcomingProject />;
   if (projectId === 3) return <StickyBoard />;
   return <UserProject projectId={projectId} />;
};

export default Project;
