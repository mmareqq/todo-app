export default class ProjectModel {
   #id;
   constructor(id, name = '') {
      this.#id = id;
      this.name = name;
   }
   get id() {
      return this.#id;
   }
}
