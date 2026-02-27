import TodoListDetailView from "../pages/listDetailPage.js";
const CreateProjectForm = {
  render: () => {
    const form = document.createElement("form");
    form.setAttribute("action", "none");
    form.id = "project-form";
    form.innerHTML = `
      <form action="none">
        <p class="form-title">
          <button type="button" class="close-form" id="close-create-project-button">x</button>
        </p>
        <p>
          <label for="project-title">Project name</label>
          <input
            type="text"
            id="project-name-input-project-form"
            placeholder="Project name"
            required
          />
        </p>
        <h5 id="project-form-error-prompt"></h5>
        <button type="button" class="submit" id="create-project-button">Create project</button>
      </form>
    `;
    form.style.zIndex = 3;
    return form;
  },
  initEventListeners: (appStore) => {
    const closeCreateProjectBtn = document.querySelector(
      "#close-create-project-button",
    );
    const formModal = document.querySelector("#project-form");
    const errorPrompt = document.querySelector("#project-form-error-prompt");
    closeCreateProjectBtn.addEventListener("click", () => {
      formModal.style.visibility = "hidden";
    });

    const createProjectSubmitBtn = document.querySelector(
      "#create-project-button",
    );
    createProjectSubmitBtn.addEventListener("click", (e) => {
      const projectName = document.querySelector(
        "#project-name-input-project-form",
      );
      if (!projectName.value.trim()) {
        errorPrompt.textContent = "Project name cannot be blank";
        return;
      }
      const newProj = appStore.getOrCreateProject(projectName.value);
      projectName.value = "";
      errorPrompt.textContent = "";
      formModal.style.visibility = "hidden";
      TodoListDetailView.projectLineItemUpdate(
        appStore.getAllProjectsForDisplay(),
        newProj.id,
        newProj.name,
      );
    });
  },
};
export default CreateProjectForm;
