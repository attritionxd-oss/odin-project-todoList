const defaults = [
  { name: "electricMint", color: "#afffd7" },
  { name: "softLavender", color: "#e2ccff" },
  { name: "skyGlow", color: "#aeefff" },
  { name: "peachPunch", color: "#ffd1ba" },
  { name: "lemonFizz", color: "#fff5ad" },
  { name: "rosePetal", color: "#ffb7ce" },
  { name: "cyberLime", color: "#d4ff91" },
  { name: "icyPeriwinkle", color: "#c2d1ff" },
  { name: "vividApricot", color: "#ffc09f" },
  { name: "arcticTeal", color: "#98fffb" },
];
export class Color {
  #colors = [];
  #colorNames = {};
  #defaultColor = defaults[1].color;
  constructor() {
    defaults.map((item) => {
      this.#colors.push(item.color);
    });
    this.#colorNames = Object.fromEntries(
      defaults.map((item) => [item.name, item.color]),
    );
  }
  addColor(colorName, hexValue) {
    this.#colors.push(hexValue);
    this.#colorNames[colorName] = hexValue;
  }
  removeColor(colorName) {
    delete this.#colorNames[colorName];
  }
  getColors() {
    return this.#colors;
  }
  getColorMap() {
    return this.#colorNames;
  }
  getColor(colorName) {
    return this.#colorNames[colorName];
  }
  get defaultColor() {
    return this.#defaultColor;
  }
  set defaultColor(name) {
    if (!this.getColor(name)) {
      console.error(
        "Unable to set default color, does not exist. " +
          "Create the color first using `addColor",
      );
      return;
    }
    this.#defaultColor = this.getColorMap()[name];
  }
}

export function testColorClass() {
  const colors = new Color();
  console.log(colors.getColorMap());
  colors.addColor("white", "#ffffff");
  colors.addColor("black", "#000000");
  console.log(colors.getColorMap());
  colors.removeColor("softLavender");
  console.log(colors.getColorMap());
}

const BaseColor = new Color();
export default BaseColor;
