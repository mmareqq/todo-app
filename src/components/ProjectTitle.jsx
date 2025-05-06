import EditProjectButton from './EditProjectButton';
export default function ProjectTitle({ project, editProject }) {
   return (
      <div className="border-primary-500 flex items-end justify-between border-b-1 py-2">
         <h2 className="pt-4 text-2xl">{project.name}</h2>
         <EditProjectButton editProject={editProject} project={project} />
      </div>
   );
}
