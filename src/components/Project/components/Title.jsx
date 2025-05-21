import EditProjectButton from './EditProjectButton';

function Title({ project, editProject, editable }) {
   return (
      <div className="border-primary-500 flex items-end justify-between border-b-1 py-2">
         <h2 className="pt-4 text-2xl">{project.name}</h2>
         {editable && (
            <EditProjectButton project={project} editProject={editProject} />
         )}
      </div>
   );
}

export default Title;
