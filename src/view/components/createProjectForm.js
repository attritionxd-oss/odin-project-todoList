const CreateProjectForm = {
  render: () => {
    const form = document.createElement("form");
    form.setAttribute("action", "none");
    form.id = "project-form";
    form.innerHTML = `
      <form action="none">
        <p>
          <input
            type="text"
            id="project-name-input"
            placeholder="Project name"
            required
          />
          <button type="button" class="close-form" id="closeCreateProject">x</button>
        </p>
        <p>
          <label for="project-description">Description</label>
          <input
            type="text"
            id="project-description-input"
            placeholder="Description of your project"
          />
        </p>
        <button type="button" class="submit" id="createProject">Create project</button>
      </form>
    `;
    return form;
  },
  initEventListeners: (appStore) => {
    const closeCreateProjectBtn = document.querySelector("#closeCreateProject");
    const formModal = document.querySelector("#project-form");
    closeCreateProjectBtn.addEventListener("click", () => {
      formModal.style.visibility = "hidden";
    });
  },
};
export default CreateProjectForm;
