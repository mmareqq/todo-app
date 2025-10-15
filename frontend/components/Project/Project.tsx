import UserProject from './UserProject';
import UpcomingProject from './Upcoming';
import TodayProject from './Today';
import InboxProject from './Inbox';
import StickyBoard from '@components/StickyBoard';
import { appProjects } from '@frontend/data/data';
import useSettingsContext from '@hooks/useSettingsContext';
import type { Id } from '@types';

const Project = () => {
   const { settings, updateSetting } = useSettingsContext();
   const id = settings.activeProjectId;
   if (id === appProjects.inbox.id) return <InboxProject />;
   if (id === appProjects.today.id) return <TodayProject />;
   if (id === appProjects.upcoming.id) return <UpcomingProject />;
   if (id === appProjects.stickyBoard.id) return <StickyBoard />;
   return (
      <UserProject
         projectId={id}
         updateActiveId={id => updateSetting('activeProjectId', id)}
      />
   );
};

export default Project;
