import formTemplate from "./todoListForm.html";
import TodoListsView from "../pages/listPage.js";

const CreateTodoListForm = {
  render: () => {
    const container = document.createElement("div");
    container.id = "form-wrapper";
    container.innerHTML = formTemplate;
    return container;
  },
  initEventListeners: (appStore) => {
    const closeCreateTodoList = document.querySelector("#closeCreateTodoList");
    const formModal = document.querySelector("#todo-list-form");
    const listNameInput = document.querySelector("#list-name-input-todo-form");
    const errorPopup = document.querySelector("div .error-popup");

    closeCreateTodoList.addEventListener("click", () => {
      formModal.style.visibility = "hidden";
    });

    const submitButton = document.querySelector("#createTodoList");
    submitButton.addEventListener("click", () => {
      const listNameValue = listNameInput.value;
      const projectField = document.querySelector(
        "#project-name-input-todo-form",
      );
      const projectName = !projectField.value ? "Default" : projectField.value;
      console.log(projectName);
      if (!listNameValue.trim()) {
        return;
      }
      const listExists = appStore.todoLists.find(
        (l) => l.name === listNameValue,
      );
      if (!listExists) {
        const selectedProjectId = `${appStore.getOrCreateProject(projectName).id}`;
        appStore.getOrCreateTodoList(listNameValue, selectedProjectId);

        formModal.style.visibility = "hidden";
        TodoListsView.render(appStore);

        // clear input contents
        listNameInput.value = "";
        projectField.value = "";
      }
    });

    function validateInput() {
      const listNameValue = listNameInput.value.trim();
      const listExists = appStore.todoLists.find(
        (l) => l.name === listNameValue,
      );
      const isEmpty = listNameValue === "";
      // should be your boolean logic (e.g., from an API or Array)
      const exists = typeof listExists !== "undefined" ? listExists : false;

      let errorMessage = "";
      if (isEmpty) {
        errorMessage = "Please enter a name";
      } else if (exists) {
        errorMessage = "Name already exists";
      }

      if (errorMessage) {
        errorPopup.textContent = errorMessage;
        errorPopup.classList.replace(
          "error-popup-hidden",
          "error-popup-visible",
        );
        listNameInput.classList.add("input-error");
        listNameInput.setCustomValidity(errorMessage); // Prevents form submit
      } else {
        errorPopup.classList.replace(
          "error-popup-visible",
          "error-popup-hidden",
        );
        listNameInput.classList.remove("input-error");
        listNameInput.setCustomValidity(errorMessage); // Clears error
      }
    }

    listNameInput.addEventListener("blur", validateInput);
    listNameInput.addEventListener("input", validateInput);
  },
};

export default CreateTodoListForm;
