function initalizeTasksInStorage(projectId) {
   localStorage.setItem(`tasks-${projectId}`, '[]');
}

export { initalizeTasksInStorage };
