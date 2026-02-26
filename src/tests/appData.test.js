import { describe, it, expect, vi } from "vitest";
import AppData from "../controllers/appData";

describe("AppData Orchestration", () => {
  it("should call storage.save when a project is created", async () => {
    // 1. Create a "Fake" processor with dummy functions
    const mockStorage = {
      save: vi.fn().mockResolvedValue(true), // vi.fn() tracks if it was called
      load: vi.fn().mockResolvedValue(null),
    };

    const store = new AppData(mockStorage);

    // 2. Act: Create a project
    await store.getOrCreateProject("Test Project");

    // 3. Assert: Did appData tell the storage to save?
    expect(mockStorage.save).toHaveBeenCalled();

    // Check if the saved data actually contains the project name
    const lastSavedData = mockStorage.save.mock.calls[0][1];
    expect(lastSavedData.projects[0].name).toBe("Test Project");
  });
});
