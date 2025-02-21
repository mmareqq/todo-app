export default function TaskForm({ task, updateValue }) {
   return (
      <div className="mb-6 flex gap-4">
         <label htmlFor="taskName">Name:</label>
         <input
            className="border"
            type="text"
            id="taskName"
            name="taskName"
            value={task.name}
            onChange={e => {
               updateValue('name', e.target.value);
            }}
         />
      </div>
   );
}
