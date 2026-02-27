import TodoListDetailView from "./listDetailPage.js";
const TodoListsView = {
  render: (appStore) => {
    function createProjectElement(allProjects, pId, pName) {
      const element = document.createElement("p");
      element.classList.add("todo-list-grid-content");

      const labelForProject = document.createElement("p");
      labelForProject.textContent = "Project";

      const inputForProject = document.createElement("p");
      inputForProject.type = "text";
      inputForProject.classList.add("todo-list-project-tag");
      inputForProject.textContent = pName;

      element.appendChild(labelForProject);
      element.appendChild(inputForProject);
      return element;
    }

    const appContent = document.querySelector("#app-content");
    appContent.innerHTML = "";
    const todoLists = appStore.getAllListsForDisplay();
    const allProjects = appStore.getAllProjectsForDisplay();
    todoLists.forEach((element) => {
      const list = document.createElement("article");
      const listId = element.id;
      const projectId = element.projectId;
      const projectName = element.projectName;

      list.classList.add("todo-list-block");
      list.id = listId;

      const listTitle = document.createElement("h3");
      listTitle.textContent = element.name;

      list.appendChild(listTitle);
      list.appendChild(
        createProjectElement(allProjects, projectId, projectName),
      );
      appContent.appendChild(list);
    });

    return todoLists;
  },
  initEventListeners: (appStore) => {
    const listBlocks = document.querySelectorAll(".todo-list-block");
    listBlocks.forEach((block) => {
      block.addEventListener("click", (e) => {
        try {
          const targetList = appStore.getTodoList(e.target.id);
          TodoListDetailView.updateDetail(
            appStore.getAllProjectsForDisplay(),
            targetList,
            e.target,
          );
        } catch (error) {
          TodoListsView.render(appStore);
          console.error("Error finding list. Try refreshing the page");
        }
      });
    });
  },
};

export default TodoListsView;
