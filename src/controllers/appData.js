import Project from "../model/project.js";
import TodoList from "../model/todoList.js";
import TodoItem from "../model/todoItem.js";
import BaseColor from "../model/colors.js";

class AppData {
  #storage;
  #LOCAL_STORAGE_KEY = "todo_app_key";
  constructor(storageProcessor) {
    this.storage = storageProcessor;
    this.projects = [];
    this.todoLists = [];
    this.todoItems = [];
    this.isLoaded = false;
    this.defaultProjectId;
  }
  async init() {
    try {
      const data = await this.storage.load(this.#LOCAL_STORAGE_KEY);
      if (data) {
        // Hydrate the raw JSON back into Class Instances
        this.hydrate(data);
      }
      this.isLoaded = true;
      console.log("Store initialized, data hydrated.");
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  }

  hydrate(data) {
    this.projects = data.projects.map((p) => new Project(p.id, p.name));
    this.todoLists = data.todoLists.map((l) => new Project(l.id, l.name));
    this.todoItems = data.todoItem.map((i) => new Project(i.id, i.name));
    this.defaultProjectId = data.projects.find((p) => (p.name = "Default"));
  }
  async saveData() {
    const dataToSave = {
      projects: this.projects.map((p) => p.toJSON()),
      todoLists: this.todoLists.map((l) => l.toJSON()),
      todoItem: this.todoItems.map((i) => i.toJSON()),
    };
    await this.storage.save(this.#LOCAL_STORAGE_KEY, dataToSave);
  }
}

AppData.prototype.getOrCreateProject = function (name) {
  let project = this.projects.find((p) => p.name === name);

  if (!project) {
    project = new Project(null, name);
    this.projects.push(project);
    this.saveData();
  }

  return project;
};
// !todo
AppData.prototype.updateProject = function (id) {};
AppData.prototype.deleteProject = function (id) {};
AppData.prototype.getTodoList = function (id) {};
AppData.prototype.getOrCreateTodoList = function (name) {
  let list = this.todoLists.find((l) => l.name === name);
  if (!list) {
    list = new TodoList(null, name);
    list.projectId = this.defaultProjectId;

    this.todoLists.push(list);
    this.saveData();
  }
  return list;
};
AppData.prototype.updateTodoList = function (id) {};
AppData.prototype.deleteTodoList = function (id) {};
AppData.prototype.getTodoItem = function (id) {};
AppData.prototype.createTodoItem = function (name) {
  let item = this.todoItems.find((i) => i.name === name);
  if (!item) {
    item = new TodoItem(null, name);
  }
  this.todoItems.push(item);

  return item;
};
AppData.prototype.updateTodoItem = function (id) {};
AppData.prototype.deleteTodoItem = function (id) {};

export default AppData;
