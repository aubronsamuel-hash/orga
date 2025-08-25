import { describe, it, expect } from "vitest";

describe("health placeholder", () => {
  it("dummy ok", () => {
    expect(true).toBe(true);
  });

  it("env has default api", async () => {
    // dynamic import to avoid env at compile time
    const { getApiBase } = (await import("../lib/env")) as { getApiBase: () => string };
    const base = getApiBase();
    expect(typeof base).toBe("string");
    expect(base.length).toBeGreaterThan(0);
  });
});
