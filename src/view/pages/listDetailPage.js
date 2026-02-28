import TodoListsView from "./listPage.js";

const body = document.querySelector("body");
const containerWrapper = document.createElement("div");
const container = document.createElement("div");
container.classList.add("todo-list-detail-block");

// title line-item
const pTitle = document.createElement("p");
const title = document.createElement("h3");
const xBtn = document.createElement("button");

// add note button
const addNoteBtn = document.createElement("button");
addNoteBtn.classList.add("add-new-note");

// line item block
const listItemWrapper = document.createElement("div");
listItemWrapper.classList.add("list-item-wrapper");

// --------------------------- default export ---------------------------
const TodoListDetailView = {
  updateDetail: (appStore, listId, block) => {
    const listObject = appStore.getTodoListById(listId);
    container.dataset.listId = block.id;
    title.textContent = listObject.name;
    projectLineItemUpdate(
      appStore.getAllProjectsForDisplay(),
      listObject.projectId,
      listObject.projectName,
    );
    updateAddNoteInit(listObject.id);
    populateListItems(appStore);
    handleItemStatusFlag(appStore);
    containerWrapper.style.visibility = "visible";
    container.style.visibility = "visible";
  },
  initEventListeners: (appStore) => {
    xBtn.addEventListener("click", () => {
      containerWrapper.style.visibility = "hidden";
      container.style.visibility = "hidden";
      document.querySelector(".new-note").style.visibility = "hidden";
      document.querySelector(".add-new-note").style.visibility = "hidden";
    });
    handleChangeProject(appStore);
    handleNewNote(appStore);
  },
  render: () => {
    containerWrapperInit();
    titleInit();
    projectInit();
    addNoteInit();
  },
};

// --------------------------- default export ---------------------------

function containerWrapperInit() {
  containerWrapper.classList.add("container-wrapper");
  body.appendChild(containerWrapper);
  body.appendChild(container);
}
function titleInit() {
  pTitle.classList.add("title-line-item");
  xBtn.classList.add("close-block-button");
  xBtn.type = "button";
  xBtn.textContent = "x";
  pTitle.appendChild(title);
  pTitle.appendChild(xBtn);
  container.appendChild(pTitle);
}

function projectInit() {
  const pProject = document.createElement("p");
  pProject.classList.add("todo-list-grid-content");

  const pLabel = document.createElement("label");
  pLabel.setAttribute("for", "project-name");
  pLabel.textContent = "Project";

  const pSelect = document.createElement("select");
  pSelect.id = "project-select";
  pSelect.setAttribute("name", "project-name");
  pProject.appendChild(pLabel);
  pProject.appendChild(pSelect);
  container.appendChild(pProject);
}

function projectLineItemUpdate(allProjects, pId, pName) {
  const projectSelect = document.querySelector("#project-select");
  projectSelect.innerHTML = "";
  const option = document.createElement("option");
  option.textContent = pName;
  option.dataset.projectId = pId;
  projectSelect.appendChild(option);
  allProjects
    .filter((p) => p.id !== pId)
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((p) => {
      const option = document.createElement("option");
      option.classList.add("test-class");
      option.value = p.name;
      option.textContent = p.name;
      option.dataset.projectId = p.id;
      projectSelect.appendChild(option);
    });
  const addOption = document.createElement("option");
  addOption.value = "create-new-project";
  addOption.textContent = "Create new project";
  projectSelect.appendChild(addOption);
}

function addNoteInit() {
  const btnText = document.createElement("span");
  addNoteBtn.type = "button";
  btnText.textContent = "Add new item";
  addNoteBtn.appendChild(btnText);
  container.appendChild(addNoteBtn);
}

function updateAddNoteInit(listId) {
  document.querySelector(".add-new-note").style.visibility = "visible";
  addNoteBtn.dataset.listId = listId;
}

function handleChangeProject(appStore) {
  const selectElement = document.querySelector("#project-select");
  selectElement.addEventListener("change", (e) => {
    const targetOption = e.target.options[e.target.selectedIndex];
    const targetProjectId = targetOption.dataset.projectId;

    const allProjects = appStore.getAllProjectsForDisplay();
    const targetProjectName = appStore
      .getAllProjectsForDisplay()
      .find((p) => p.id === targetProjectId).name;

    if (e.target.value === "create-new-project") {
      document.querySelector("#project-form").style.visibility = "visible";
      // !todo: check if the above passes full responsibility of
      // creating a new project to CreateProjectForm
      // assign current list to new project using updateTodoList
    } else {
      appStore.updateTodoList(
        container.dataset.listId,
        "projectId",
        targetProjectId,
      );
      projectLineItemUpdate(allProjects, targetProjectId, targetProjectName);
      TodoListsView.render(appStore);
    }
  });
}

function handleNewNote(appStore) {
  const pNewNote = document.createElement("p");
  const input = document.createElement("input");

  pNewNote.classList.add("todo-list-grid-content");
  pNewNote.classList.add("new-note");

  const label = document.createElement("label");
  label.setAttribute("for", "new-note-name");
  label.textContent = "Note name";

  input.type = "text";
  input.name = "new-note-name";
  input.required = true;
  input.id = "new-note-input";

  pNewNote.appendChild(label);
  pNewNote.appendChild(input);

  container.insertBefore(pNewNote, addNoteBtn);
  pNewNote.style.visibility = "hidden";

  addNoteBtn.addEventListener("click", (e) => {
    addNoteBtn.style.visibility = "hidden";
    pNewNote.style.visibility = "visible";
    input.focus();
  });

  input.addEventListener("blur", (e) => {
    newNoteEvent(e, appStore);
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      newNoteEvent(e, appStore);
    }
  });
}

function newNoteEvent(e, appStore) {
  const pNewNote = document.querySelector(".new-note");
  const addNoteBtn = document.querySelector(".add-new-note");
  if (!e.target.value.trim()) {
    pNewNote.style.visibility = "hidden";
    addNoteBtn.style.visibility = "visible";
    return;
  }
  const value = e.target.value;
  e.target.value = "";

  const list = appStore.getTodoListById(container.dataset.listId);
  const project = appStore.getProjectById(list.projectId);
  appStore.createTodoItem(container.dataset.listId, value, project.id);
  populateListItems(appStore);
  handleItemStatusFlag(appStore);

  pNewNote.style.visibility = "hidden";
  addNoteBtn.style.visibility = "visible";
}

function populateListItems(appStore) {
  const targetListId = appStore.getTodoListById(container.dataset.listId).id;
  const todoItems = appStore.getTodoItemsForDisplay(targetListId);

  listItemWrapper.innerHTML = "";
  const listItemBlock = document.createElement("ul");
  todoItems.forEach((item) => {
    const li = document.createElement("li");

    const liInput = document.createElement("input");
    liInput.type = "checkbox";
    liInput.id = `status-${item.id}`;
    liInput.dataset.itemId = item.id;
    liInput.classList.add("todo-item-status-flag");
    liInput.checked = item.statusFlag;

    const liLabel = document.createElement("label");
    liLabel.setAttribute("for", `status-${item.id}`);
    liLabel.textContent = item.name;

    li.appendChild(liInput);
    li.appendChild(liLabel);

    listItemBlock.appendChild(li);
  });
  listItemWrapper.appendChild(listItemBlock);
  container.insertBefore(listItemWrapper, document.querySelector(".new-note"));
}

function handleItemStatusFlag(appStore) {
  const todoItems = document.querySelectorAll(".todo-item-status-flag");
  todoItems.forEach((itemElement) => {
    itemElement.addEventListener("click", (e) => {
      const targetItemId = e.target.dataset.itemId;
      const fieldName = "statusFlag";
      const targetFlag = e.target.checked;
      appStore.updateTodoItem(targetItemId, fieldName, targetFlag);
    });
  });
}

export default TodoListDetailView;
