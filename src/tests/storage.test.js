import { describe, it, expect, beforeEach } from "vitest";
import LocalStorageProcessor from "../service/localStorage.js";

describe("LocalStorageProcessor", () => {
  const processor = new LocalStorageProcessor();
  const testKey = "testData";

  beforeEach(() => {
    localStorage.clear(); // Start fresh for every test
  });

  it("should save and load data correctly", async () => {
    const data = { notes: [1, 2, 3] };
    await processor.save(testKey, data);

    const loadedData = await processor.load(testKey);
    expect(loadedData).toEqual(data);
  });

  it("should return null if key does not exist", async () => {
    const loadedData = await processor.load("emptyKey");
    expect(loadedData).toBeNull();
  });
});
