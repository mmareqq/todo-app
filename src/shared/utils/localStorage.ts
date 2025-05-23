export function initalizeTasksInStorage(projectId: string) {
   localStorage.setItem(`tasks-${projectId}`, '[]');
}
