export default class TaskModel {
   constructor(id, name = '', priority = 1, isFinished = false) {
      this.id = id;
      this.name = name;
      this.priority = priority;
      this.isFinished = isFinished;
   }

   complete() {
      this.isFinished = true;
   }
}
