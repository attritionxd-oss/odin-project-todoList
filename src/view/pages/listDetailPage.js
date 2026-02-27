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

// --------------------------- default export ---------------------------
const TodoListDetailView = {
  updateDetail: (allProjects, listObject, block) => {
    container.dataset.listId = block.id;
    title.textContent = listObject.name;
    projectLineItemUpdate(
      allProjects,
      listObject.projectId,
      listObject.projectName,
    );
    updateAddNoteInit(listObject.id);
    containerWrapper.style.visibility = "visible";
    container.style.visibility = "visible";
  },
  initEventListeners: (appStore) => {
    xBtn.addEventListener("click", () => {
      containerWrapper.style.visibility = "hidden";
      container.style.visibility = "hidden";
    });
    handleChangeProject(appStore);
  },
  render: () => {
    containerWrapperInit();
    titleInit();
    projectInit();
    addNoteInit();
  },
};

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
  console.log(
    allProjects
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((p, i) => `${i}: ${p.name}`),
  );
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
  addNoteBtn.setAttribute("data-list-id", listId);
}

function handleChangeProject(appStore) {
  const selectElement = document.querySelector("#project-select");
  selectElement.addEventListener("change", (e) => {
    const targetOpion = e.target.options[e.target.selectedIndex];
    const targetProjectId = targetOpion.dataset.projectId;

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

export default TodoListDetailView;
