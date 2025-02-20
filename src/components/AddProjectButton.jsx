import { useState, useEffect } from 'react';
import Dialog from './Dialog';
import ProjectModel from '../utils/projectModel';
import generateId from '../utils/generateId';
import { initalizeTasksInStorage } from '../utils/localStorage.js';

export default function AddProjectButton({ addProject, onCancel, onSuccess }) {
   const [isDialogOpen, setIsDialogOpen] = useState(false);

   useEffect(() => {
      setInputValue('');
   }, [isDialogOpen]);

   const [inputValue, setInputValue] = useState('');
   const projectData = { name: inputValue };
   return (
      <>
         <button
            className="mr-5 w-full rounded-md border px-4 py-1 transition-colors duration-200 hover:bg-gray-400/10"
            type="button"
            onClick={() => setIsDialogOpen(true)}
         >
            Add project
         </button>

         <Dialog
            isOpen={isDialogOpen}
            setIsOpen={setIsDialogOpen}
            onSuccess={() => {
               const project = new ProjectModel(generateId(), projectData.name);
               initalizeTasksInStorage(project.id);
               addProject(project);
            }}
         >
            <div className="mb-6 flex gap-4">
               <label htmlFor="projectName">Project name:</label>
               <input
                  className="border"
                  type="text"
                  id="projectName"
                  name="projectName"
                  value={inputValue}
                  onChange={e => {
                     setInputValue(e.target.value);
                  }}
               />
            </div>
         </Dialog>
      </>
   );
}
