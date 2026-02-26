import { describe, it, expect } from "vitest";
import Project from "../model/project";

describe("Project Model", () => {
  it("should generate a unique ID if none is provided", () => {
    const project = new Project(null, "Acme Corp");
    expect(project.id).toBeDefined();
    expect(typeof project.id).toBe("string");
  });

  it("should correctly convert to JSON", () => {
    const project = new Project("p123", "Acme Corp");
    const json = {
      id: project.toJSON().id,
      name: project.toJSON().name,
    };

    expect(json).toEqual({
      id: "p123",
      name: "Acme Corp",
    });
  });
});
