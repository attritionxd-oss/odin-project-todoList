import "./style-vars.css";
import "./style.css";
import "./style-form.css";
import "./style-listDetail.css";
import LocalStorageProcessor from "./service/localStorage.js";
import AppData from "./controllers/appData.js";
import { Layout } from "./view/layout.js";
import Header from "./view/components/header.js";
import CreateProjectForm from "./view/components/createProjectForm.js";
import CreateTodoListForm from "./view/components/createTodoListForm.js";
import TodoListsView from "./view/pages/listPage.js";
import TodoListDetailView from "./view/pages/listDetailPage.js";

const storage = new LocalStorageProcessor();
const appStore = new AppData(storage);

const app = document.querySelector("#root");

async function bootstrap() {
  await appStore.init();
  app.innerHTML = Layout.render();

  Header.render();
  Header.initEventListeners();

  const headerElement = document.querySelector("header");
  headerElement.appendChild(CreateTodoListForm.render());
  CreateTodoListForm.initEventListeners(appStore);

  TodoListsView.render(appStore);
  TodoListsView.initEventListeners(appStore);
  TodoListDetailView.render();
  TodoListDetailView.initEventListeners(appStore);

  document.body.appendChild(CreateProjectForm.render());
  CreateProjectForm.initEventListeners(appStore);
}

bootstrap();
