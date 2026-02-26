import BaseColor from "../model/colors.js";
import TodoItem from "../model/todoItem.js";
import TodoList from "../model/todoList.js";
import Project from "../model/project.js";
import storageAvailable from "../service/checkStorage.js";

export const testItemValues = {
  id: null,
  name: "Add sidebar",
  desc: "add sidebar with standard styles",
  dateCreated: "Wed Feb 13 2026 03:54:51 GMT+0000 (Greenwich Mean Time)",
  dateModified: "Wed Feb 18 2026 08:54:51 GMT+0000 (Greenwich Mean Time)",
  dateDue: "Wed Feb 20 2027 10:54:51 GMT+0000 (Greenwich Mean Time)",
  isStarred: false,
  priority: 3,
  project: "SudoChat",
  client: "Guy Matrix",
  tags: ["desktop", "mobile"],
  statusTags: "on-going",
};

export const testListValues = {
  name: "Client 1: Project 1: Internal app",
  desc: "This list kicks off the internal app project for Client 1",
  dateCreated: "Wed Feb 5 2026 03:54:51 GMT+0000 (Greenwich Mean Time)",
  dateModified: "Wed Feb 18 2026 08:54:51 GMT+0000 (Greenwich Mean Time)",
  dateDue: "Wed Mar 5 2027 10:54:51 GMT+0000 (Greenwich Mean Time)",
};

export const testProjectValues = {
  name: "Project 1",
  desc: "Project 1 is the initial contract signed with Client 1",
  dateCreated: "2024-07-08",
  dateModified: "2026-01-08",
  color: BaseColor.getColor("softLavender"),
};

export function mainTest() {
  const testTodoItem = new TodoItem(null, testItemValues.title);
  const testTodoList = new TodoList(null, testListValues.name);
  testTodoList.addTodoItem(testTodoItem.id);
  const testProject = new Project(null, testProjectValues.name);
  testProject.addTodoList(testTodoList.id);

  function logs() {
    console.log("ids");
    console.log(`testProject.id: ${testProject.toJSON().id}`);
    console.log(`testTodoList.id: ${testTodoList.toJSON().id}`);
    console.log(`testTodoItem.id: ${testTodoItem.toJSON().id}`);

    console.log("arrays:");
    console.log("testProject.todoLists: " + testProject.toJSON().todoLists);
    console.log("testTodoList.todoItems: " + testTodoList.toJSON().todoItems);
  }

  function checkStorage(method) {
    if (storageAvailable(method)) {
      console.log(`Storage is available for ${method}`);
    } else {
      console.log(`Storage using ${method} is NOT available`);
    }
  }

  function populateStorage() {
    if (storageAvailable("localStorage")) {
      localStorage.setItem("testProject", JSON.stringify(testProject.toJSON()));
      localStorage.setItem(
        "testTodoList",
        JSON.stringify(testTodoList.toJSON()),
      );
      localStorage.setItem(
        "testTodoItem",
        JSON.stringify(testTodoItem.toJSON()),
      );
    } else {
      throw new Error(
        "Unable to populate localStorage. localStorage unavailable",
      );
    }
  }

  function logStoredValues(objName) {
    console.log(JSON.parse(localStorage.getItem(objName)));
  }

  function clearStorage() {
    if (
      !localStorage.getItem("testProject") ||
      !localStorage.getItem("testTodoList") ||
      !!localStorage.getItem("testTodoItem")
    ) {
      console.log("Storage is already clear");
    } else {
      localStorage.clear();
    }
  }

  return {
    testTodoItem,
    testTodoList,
    testProject,
    logs,
    checkStorage,
    populateStorage,
    logStoredValues,
    clearStorage,
  };
}
