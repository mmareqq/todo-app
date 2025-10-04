import UserProject from './UserProject';
import UpcomingProject from './Upcoming';
import TodayProject from './Today';
import InboxProject from './Inbox';
import StickyBoard from '@components/StickyBoard';
import { appProjects } from '@frontend/data/data';
import type { Id } from '@types';
import { StateSetter } from '@frontend/data/helperTypes';

type Props = {
   projectId: Id;
   setActiveId: StateSetter<Id>;
};

const Project = ({ projectId, setActiveId }: Props) => {
   if (projectId === appProjects.inbox.id) return <InboxProject />;
   if (projectId === appProjects.today.id) return <TodayProject />;
   if (projectId === appProjects.upcoming.id) return <UpcomingProject />;
   if (projectId === appProjects.stickyBoard.id) return <StickyBoard />;
   return <UserProject projectId={projectId} setActiveId={setActiveId} />;
};

export default Project;
