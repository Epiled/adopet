import { describe, expect, it } from "vitest";
import {
  isAuthenticated,
  requireAuth,
  redirectAuthenticated,
} from "../src/js/auth";

describe("isAuthenticated", () => {
  it("should return false when adopet_session does not exist", () => {
    localStorage.removeItem("adopet_session");

    expect(isAuthenticated()).toBe(false);
  });

  it("should return true when adopet_session exists", () => {
    localStorage.setItem("adopet_session", "session");

    expect(isAuthenticated()).toBe(true);
  });
});

describe("requireAuth", () => {
  it("should redirect to login when user is not authenticated", () => {
    localStorage.removeItem("adopet_session");

    const originalLocation = window.location;

    delete window.location;

    window.location = {
      ...originalLocation,
      href: "",
    };

    requireAuth();

    expect(window.location.href).toBe("login.html");

    window.location = originalLocation;
  });
});

describe("redirectAuthenticated", () => {
  it("should redirect to home when user is authenticated", () => {
    localStorage.setItem("adopet_session", "session");

    const originalLocation = window.location;

    delete window.location;

    window.location = {
      ...originalLocation,
      href: "",
    };

    redirectAuthenticated();

    expect(window.location.href).toBe("home.html");
  });

  it("should not redirect when user is not authenticated", () => {
    localStorage.removeItem("adopet_session");

    const originalLocation = window.location;

    delete window.location;

    window.location = {
      ...originalLocation,
      href: "",
    };

    redirectAuthenticated();

    expect(window.location.href).not.toContain("home.html");

    window.location = originalLocation;
  });
});
