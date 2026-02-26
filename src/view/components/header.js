const Header = {
  render: () => {
    const mainMenu = document.querySelector("#main-menu");
    const addButton = document.createElement("button");
    addButton.type = "button";
    addButton.textContent = "+";
    addButton.setAttribute("alt", "Add");
    addButton.id = "addButton";
    mainMenu.appendChild(addButton);
  },

  initEventListeners: () => {
    document.querySelector("#addButton").addEventListener("click", () => {
      document.querySelector("#todo-list-form").style.visibility = "visible";
    });
  },
};

export default Header;
