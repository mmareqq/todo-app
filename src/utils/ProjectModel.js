export default class ProjectModel {
   #id;
   constructor(id, name = '', tasks = []) {
      this.#id = id;
      this.name = name;
      this.tasks = tasks;
   }
   get id() {
      return this.#id;
   }

   addTask() {}
}
