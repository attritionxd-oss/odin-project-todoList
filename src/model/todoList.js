import Joi from "joi";

const TodoSchema = Joi.object({
  id: Joi.string().optional(),
  name: Joi.string().min(1).required(),
  desc: Joi.string().optional().default(""),
  dateCreated: Joi.date().required(),
  dateModified: Joi.date().required(),
  dateDue: Joi.date().optional().default(null),
  projectId: Joi.any().optional(),
  client: Joi.string().optional(),
  todoItems: Joi.array().default([]),
});

export default class TodoList {
  #data;
  #items = [];
  constructor(id, name, projectId = null) {
    const { error, value } = TodoSchema.validate({
      id: id || crypto.randomUUID(),
      name: name,
      dateCreated: new Date(),
      dateModified: new Date(),
      projectId: null | projectId,
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
    const propSchema = TodoSchema.extract(property);
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
    console.error("id cannot be manually updated. No changes made.");
  }
  get name() {
    return this.#data.name;
  }
  set name(input) {
    this.#data.name = TodoList.#validateSchema("name", input);
  }
  get desc() {
    return this.#data.desc;
  }
  set desc(input) {
    this.#data.desc = TodoList.#validateSchema("desc", input);
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
    this.#data.dateModified = TodoItem.#validateSchema(
      "dateModified",
      new Date(input),
    );
  }
  get dateDue() {
    return this.#data.dateDue;
  }
  set dateDue(input) {
    this.#data.dateDue = TodoItem.#validateSchema("dateDue", new Date(input));
  }
  get projectId() {
    return this.#data.projectId;
  }
  set projectId(input) {
    this.#data.projectId = input;
  }
  get client() {
    return this.#data.client;
  }
  set client(input) {
    this.#data.client = input;
  }
  get todoItems() {
    return this.#items;
  }
  addTodoItem(id) {
    this.#items.push(id);
    this.#data.todoItems = this.#items;
  }
  removeTodoItem(id) {
    const index = this.#items.indexOf(id);
    return this.#items.splice(index, 1);
  }
  toJSON() {
    return this.#data;
  }
}
