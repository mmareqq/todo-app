type Project = {
   id: string;
   name: string;
   editable: boolean;
   createdByUser: boolean;
};

type Task = {
   id: string;
   finished: boolean;
   name: string;
   priority: number;
   duration: number;
   date: string | null;
   createdAt: string;
};

export { Task, Project };
