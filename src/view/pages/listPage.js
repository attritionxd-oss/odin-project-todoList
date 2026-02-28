import TodoListDetailView from "./listDetailPage.js";
const TodoListsView = {
  render: (appStore) => {
    const appContent = document.querySelector("#app-content");
    appContent.innerHTML = "";
    const todoLists = appStore.getAllListsForDisplay();
    const allProjects = appStore.getAllProjectsForDisplay();
    todoLists.forEach((element) => {
      const article = document.createElement("article");
      const listId = element.id;
      const projectId = element.projectId;
      const projectName = element.projectName;

      article.classList.add("todo-list-block");
      article.id = listId;
      article.dataset.listId = listId;

      const listTitle = document.createElement("h3");
      listTitle.textContent = element.name;

      article.appendChild(listTitle);
      article.appendChild(
        createProjectElement(allProjects, projectId, projectName),
      );
      appContent.appendChild(article);
    });

    populateListItems(appStore);

    return todoLists;
  },
  initEventListeners: (appStore) => {
    const listBlocks = document.querySelectorAll(".todo-list-block");
    listBlocks.forEach((block) => {
      block.addEventListener("click", (e) => {
        const targetId = e.target.dataset.listId;
        TodoListDetailView.updateDetail(appStore, targetId, e.target);
      });
    });
  },
};

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

function populateListItems(appStore) {
  const articles = document.querySelectorAll(".todo-list-block");
  articles.forEach((article) => {
    const listId = article.dataset.listId;
    const targetTodoItems = appStore.getTodoItemsForDisplay(listId);
    console.log(targetTodoItems);
    const listItemWrapper = document.createElement("div");
    listItemWrapper.classList.add("list-item-wrapper");
    const ul = document.createElement("ul");

    targetTodoItems.forEach((item) => {
      const li = document.createElement("li");
      const liInput = document.createElement("input");
      liInput.type = "checkbox";
      liInput.checked = item.statusFlag;
      const liLabel = document.createElement("label");
      liLabel.textContent = item.name;

      li.appendChild(liInput);
      li.appendChild(liLabel);
      ul.appendChild(li);
    });
    listItemWrapper.appendChild(ul);
    article.appendChild(listItemWrapper);
  });
}

export default TodoListsView;
