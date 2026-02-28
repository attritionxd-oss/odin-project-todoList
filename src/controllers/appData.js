import Project from "../model/project.js";
import TodoList from "../model/todoList.js";
import TodoItem from "../model/todoItem.js";
import BaseColor from "../model/colors.js";

class AppData {
  // #storage;
  #LOCAL_STORAGE_KEY = "todo_app_key";
  #defaultProjectName = "Default";
  constructor(storageProcessor) {
    this.storage = storageProcessor;
    this.projects = [];
    this.todoLists = [];
    this.todoItems = [];
    this.isLoaded = false;
    this.defaultProjectId = null;
  }
  async init() {
    try {
      const data = await this.storage.load(this.#LOCAL_STORAGE_KEY);
      if (data) {
        // Hydrate the raw JSON back into Class Instances
        this.defaultProjectId = data.defaultProjectId;
        this.hydrate(data);
      }

      const defaultProject = this.getOrCreateProject(this.defaultProjectName);
      this.defaultProjectId = defaultProject.id;

      this.isLoaded = true;
      console.info("Store initialized, data hydrated.");
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  }

  hydrate(data) {
    this.projects = data.projects.map((p) => new Project(p.id, p.name));
    this.todoLists = data.todoLists.map(
      (l) => new TodoList(l.id, l.name, l.projectId),
    );
    this.todoItems = data.todoItems.map(
      (i) =>
        new TodoItem(i.id, i.name, i.todoListId, i.projectId, i.statusFlag),
    );
  }

  async saveData() {
    const dataToSave = {
      projects: this.projects.map((p) => p.toJSON()),
      todoLists: this.todoLists.map((l) => l.toJSON()),
      todoItems: this.todoItems.map((i) => i.toJSON()),
      defaultProjectId: this.defaultProjectId,
    };
    await this.storage.save(this.#LOCAL_STORAGE_KEY, dataToSave);
  }
  get defaultProjectName() {
    return this.#defaultProjectName;
  }
}

AppData.prototype.getAllProjectsForDisplay = function () {
  return this.projects;
};

AppData.prototype.getAllListsForDisplay = function () {
  const allLists = this.todoLists.slice();
  allLists.map((listItem) => {
    const project = this.projects.find((p) => p.id === listItem.projectId);
    return Object.assign(
      listItem, // id, title, content
      { projectName: project ? project.name : "No project" },
    );
  });
  return allLists;
};

AppData.prototype.getOrCreateProject = function (name) {
  let project = this.projects.find((p) => p.name === name);

  if (!project) {
    project = new Project(null, name);
    this.projects.push(project);
    this.saveData();
  }

  return project;
};

AppData.prototype.getProjectById = function (targetProjectId) {
  let project = this.projects.find((p) => p.id === targetProjectId);

  return project;
};

AppData.prototype.updateProject = function (targetId, fieldName, newValue) {
  let project = this.projects.find((p) => p.id === targetId);
  project[fieldName] = newValue;
  this.saveData();

  console.info(
    `Project '${project.name}' ${fieldName}: now set to ${newValue}`,
  );
};
// !todo
AppData.prototype.deleteProject = function (id) {};
AppData.prototype.getTodoList = function (listId) {
  const list = this.todoLists.find((l) => l.id === listId);
  return list;
};
AppData.prototype.getOrCreateTodoList = function (name, projectId = null) {
  const targetProjectId = projectId || this.defaultProjectId;
  let list = this.todoLists.find(
    (l) => l.name === name && l.projectId === targetProjectId,
  );
  if (!list) {
    list = new TodoList(null, name, targetProjectId);

    this.todoLists.push(list);
    this.saveData();
  }
  return list;
};

AppData.prototype.getTodoListById = function (targetListId) {
  let list = this.todoLists.find((l) => l.id === targetListId);
  return list;
};

AppData.prototype.updateTodoList = function (targetId, fieldName, newValue) {
  let list = this.todoLists.find((l) => l.id === targetId);
  if (!list[fieldName]) {
    throw new Error(`Field name: ${fieldName} not found.`);
  }
  list[fieldName] = newValue;
  this.saveData();

  console.info(`List '${list.name}' ${fieldName}: now set to ${newValue}`);
};
// !todo
AppData.prototype.deleteTodoList = function (id) {};
AppData.prototype.getTodoItem = function (id) {};
AppData.prototype.getTodoItemsForDisplay = function (targetListId) {
  const list = this.todoLists.find((l) => l.id === targetListId);
  if (!list) {
    console.error(`listId (${targetListId}) is not found`);
    return;
  }
  const items = this.todoItems.filter((i) => i.todoListId === list.id);
  return items;
};
AppData.prototype.createTodoItem = function (
  listId,
  itemName,
  projectId = null,
) {
  let item = new TodoItem(null, itemName, listId, projectId);
  this.todoItems.push(item);
  this.saveData();

  console.info(`Item ${itemName} has been created`);
  return item;
};
AppData.prototype.updateTodoItem = function (targetId, fieldName, newValue) {
  let item = this.todoItems.find((i) => i.id === targetId);
  if (!item) {
    throw new Error(`TodoList item with ${targetId} is not found.`);
  }

  item[fieldName] = newValue;
  this.saveData();

  console.info(`Item '${item.name}' ${fieldName}: now set to to ${newValue}`);
};
AppData.prototype.deleteTodoItem = function (id) {};

export default AppData;
