export default class TaskModel {
   constructor(id, name = '', priority = 1, finished = false) {
      this.id = id;
      this.name = name;
      this.priority = priority;
      this.finished = finished;
   }
}
