export default function getTasks(projectId) {
   const tasks = localStorage.getItem(`tasks-${projectId}`);
   return JSON.parse(tasks) || [];
}
