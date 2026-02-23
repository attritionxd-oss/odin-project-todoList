import BaseColor from "./colors.js";
const BASE_COLORS = BaseColor.getColors();

import Joi from "joi";
const ProjectSchema = Joi.object({
  id: Joi.string().optional(),
  name: Joi.string().min(1).required(),
  desc: Joi.string().optional().default(""),
  dateCreated: Joi.date().required(),
  dateModified: Joi.date().required(),
  color: Joi.string()
    .valid(...BASE_COLORS)
    .optional()
    .default(BaseColor.defaultColor),
  todoLists: Joi.array().optional().default([]),
});
export default class Project {
  #data;
  #lists = [];
  // !todo: create default properties to be loaded when !input
  constructor(id, name) {
    const { error, value } = ProjectSchema.validate({
      id: id || crypto.randomUUID(),
      name: name,
      dateCreated: new Date(),
      dateModified: new Date(),
    });
    if (error) {
      throw new Error(`Validation error ${error.details[0].message}`);
    }
    this.#data = value;
  }
  toJSON() {
    return this.#data;
  }
  static #validateSchema(property, input) {
    const propSchema = ProjectSchema.extract(property);
    const { error, value } = propSchema.validate(input);
    if (error) {
      throw new Error(`Invalid ${property}: ${error.details[0].message}`);
    }
    if (
      property.startsWith("date") &&
      Object.getPrototypeOf(input) !== Date.prototype
    ) {
      throw new Error(`Invalid: input is not a Date`);
    }
    return value;
  }
  get id() {
    return this.#data.id;
  }
  set id(_) {
    console.error("id cannot me manually updated. No changes made.");
  }
  get name() {
    return this.#data.name;
  }
  set name(input) {
    this.#data.name = Project.#validateSchema("name", input);
  }
  get desc() {
    return this.#data.desc;
  }
  set desc(input) {
    this.#data.desc = Project.#validateSchema("desc", input);
  }
  get dateCreated() {
    return this.#data.dateCreated;
  }
  set dateCreated(_) {
    console.error(`dateCreated cannot be manually updated. No changes made.`);
  }
  get dateModified() {
    return this.#data.dateModified;
  }
  set dateModified(input) {
    this.#data.dateModified = Project.#validateSchema("dateModified", input);
  }
  get color() {
    return this.#data.color;
  }
  set color(input) {
    this.#data.color = Project.#validateSchema("color", input);
  }
  get lists() {
    return this.#lists;
  }
  set lists(id) {
    this.addTodoList(id);
  }
  addTodoList(id) {
    this.#lists.push(id);
    this.#data.todoLists = this.#lists;
  }
  removeTodoList(id) {
    const index = this.#lists.indexOf(id);
    return this.#lists.splice(index, 1);
  }
}
