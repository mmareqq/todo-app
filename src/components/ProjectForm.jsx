export default function ProjectForm({ project, updateValue }) {
   return (
      <div className="mb-6 flex gap-4">
         <label htmlFor="projectName">
            Project name:
            <input
               className="ml-4 border"
               type="text"
               id="projectName"
               name="projectName"
               value={project.name}
               onChange={e => {
                  updateValue('name', e.target.value);
               }}
            />
         </label>
      </div>
   );
}
