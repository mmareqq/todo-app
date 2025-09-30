import UserProject from './UserProject';
import UpcomingProject from './UpcomingProject';
import TodayProject from './TodayProject';
import StickyBoard from '@components/StickyBoard';
import type { Id } from '@types';
import { StateSetter } from '@frontend/data/helperTypes';

type Props = {
   projectId: Id;
   setActiveId: StateSetter<Id>;
};

const Project = ({ projectId, setActiveId }: Props) => {
   if (projectId === 1) return <TodayProject />;
   if (projectId === 2) return <UpcomingProject />;
   if (projectId === 3) return <StickyBoard />;
   return <UserProject projectId={projectId} setActiveId={setActiveId} />;
};

export default Project;
