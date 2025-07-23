import type { ProjectPayload } from '@data/types';
import type { UpdateValue } from '@data/helperTypes';

type Props = {
   project: ProjectPayload;
   updateValue: UpdateValue<ProjectPayload>;
};

const ProjectForm = ({ project, updateValue }: Props) => {
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
};

export default ProjectForm;
