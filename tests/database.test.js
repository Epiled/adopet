import { describe, expect, it, vi } from "vitest";
import { initializeDatabase } from "../src/js/database";

describe("database", () => {
  it("should initialize db when it does not exist", async () => {
    localStorage.removeItem("adopet");

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: () =>
          Promise.resolve({
            users: [],
            pets: [],
          }),
      }),
    );

    await initializeDatabase();

    expect(localStorage.getItem("adopet")).not.toBeNull();
  });

  it("should not fetch when db already exists", async () => {
    localStorage.setItem(
      "adopet",
      JSON.stringify({
        users: [],
        pets: [],
      }),
    );

    const fetchMock = vi.fn();

    vi.stubGlobal("fetch", fetchMock);

    await initializeDatabase();

    expect(fetchMock).not.toHaveBeenCalled();
  });
});
