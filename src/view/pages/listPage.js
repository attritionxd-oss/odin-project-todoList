const TodoListsView = {
  createProjectElement: (pId, pName) => {
    const element = document.createElement("p");
    element.classList.add("todo-list-block-content");
    const labelForProject = document.createElement("label");
    labelForProject.setAttribute("for", "project-name");
    labelForProject.textContent = "Project";
    const inputForProject = document.createElement("input");
    inputForProject.type = "text";
    inputForProject.classList.add("todo-list-project-tag");
    inputForProject.value = pName;
    element.appendChild(labelForProject);
    element.appendChild(inputForProject);
    return element;
  },
  createAddNoteButton: (listId) => {
    const btn = document.createElement("button");
    const btnText = document.createElement("span");
    btn.type = "button";
    btn.classList.add("add-new-note");
    btn.setAttribute("data-list-id", listId);
    btnText.textContent = "Add new item";
    btn.appendChild(btnText);
    return btn;
  },
  render: (appStore) => {
    const appContent = document.querySelector("#app-content");
    appContent.textContent = "";
    const todoLists = appStore.getAllListsForDisplay();
    todoLists.forEach((element) => {
      console.log(element.name, element.projectId); // !todo: fix projectId bug
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
        TodoListsView.createProjectElement(projectId, projectName),
      );
      list.appendChild(TodoListsView.createAddNoteButton(listId));
      appContent.appendChild(list);
    });

    return todoLists;
  },
};

export default TodoListsView;
