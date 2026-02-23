import Joi from "joi";
const ALLOWED_STATUS_TAGS = [
  "started",
  "pending",
  "on-going",
  "blocked",
  "completed",
];
const ALLOWED_PRIORITY_TAGS = [1, 2, 3, 4, 5];
const TodoItemSchema = Joi.object({
  id: Joi.string().optional(),
  name: Joi.string().min(1).required(),
  desc: Joi.string().optional().default(""),
  dateCreated: Joi.date().required(),
  dateModified: Joi.date().required(),
  dateDue: Joi.date().optional().default(null),
  isStarred: Joi.boolean().optional().default(false),
  priority: Joi.number()
    .valid(...ALLOWED_PRIORITY_TAGS)
    .optional()
    .default(3),
  todoListId: Joi.any().optional(),
  projectId: Joi.any().optional(),
  client: Joi.string().optional(),
  tags: Joi.string().optional().default([]),
  statusTags: Joi.string()
    .valid(...ALLOWED_STATUS_TAGS)
    .optional()
    .default("pending"),
});
export default class TodoItem {
  #data;
  constructor(id, name, todoListId = null, projectId = null) {
    const { error, value } = TodoItemSchema.validate({
      id: id || crypto.randomUUID(),
      name: name,
      dateCreated: new Date(),
      dateModified: new Date(),
      todoListId: null || todoListId,
      projectId: null || projectId,
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
    const propSchema = TodoItemSchema.extract(property);
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
    this.#data.name = TodoItem.#validateSchema("name", input);
  }
  get desc() {
    return this.#data.desc;
  }
  set desc(input) {
    this.#data.desc = TodoItem.#validateSchema("desc", input);
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
  get isStarred() {
    return this.#data.isStarred;
  }
  set isStarred(input) {
    this.#data.isStarred = TodoItem.#validateSchema("isStarred", input);
  }
  get priority() {
    return this.#data.priority;
  }
  set priority(input) {
    this.#data.priority = TodoItem.#validateSchema("priority", input);
  }
  get todoListId() {
    return this.#data.todoListId;
  }
  set todoListId(input) {
    this.#data.todoListId = TodoItem.#validateSchema("todoListId", input);
  }
  get projectId() {
    return this.#data.projectId;
  }
  set projectId(input) {
    this.#data.projectId = TodoItem.#validateSchema("projectId", input);
  }
  get client() {
    return this.#data.client;
  }
  set client(input) {
    this.#data.client = TodoItem.#validateSchema("client", input);
  }
  get tags() {
    return this.#data.tags;
  }
  get statusTags() {
    return this.#data.statusTags;
  }
  addTag(tag) {
    this.#data.tags.push(TodoItem.#validateSchema("tags", tag));
  }
  removeTag(tag) {
    const index = this.#data.tags.indexOf(tag);
    return this.#data.tags.splice(index, 1);
  }
  set statusTags(input) {
    this.#data.statusTags = TodoItem.#validateSchema("statusTags", input);
  }
}
