import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createLoginForm } from "./helpers/createLoginForm";

vi.mock("../src/js/database.js", () => ({
  initializeDatabase: vi.fn(),
}));

vi.mock("../src/js/auth.js", () => ({
  redirectAuthenticated: vi.fn(),
}));

describe("login", () => {
  beforeEach(() => {
    vi.resetModules();
    localStorage.clear();
    document.body.innerHTML = "";
    localStorage.removeItem("adopet");
    localStorage.removeItem("adopet_session");
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should login with valid credentials", async () => {
    vi.useFakeTimers();

    const { form } = createLoginForm({
      email: "user@gmail.com",
      password: "123456",
    });

    document.body.append(form);

    await import("../src/js/login.js");

    localStorage.setItem(
      "adopet",
      JSON.stringify({
        users: [
          {
            email: "user@gmail.com",
            password: "123456",
            name: "Usuário",
          },
        ],
      }),
    );

    form.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true }),
    );

    await vi.advanceTimersByTime(1000);

    await vi.waitFor(() => {
      const session = JSON.parse(localStorage.getItem("adopet_session"));
      expect(session.email).toBe("user@gmail.com");
      expect(session.password).toBeUndefined();
      expect(localStorage.getItem("adopet_session")).not.toBeNull();
    });

    vi.useRealTimers();
  });

  it("should not login with invalid credentials", async () => {
    vi.useFakeTimers();

    const { form, loginFeedback } = createLoginForm({
      email: "user.not@gmail.com",
      password: "789456",
    });

    document.body.append(form);

    await import("../src/js/login.js");

    localStorage.setItem(
      "adopet",
      JSON.stringify({
        users: [
          {
            email: "user@gmail.com",
            password: "123456",
            name: "Usuário",
          },
        ],
      }),
    );

    form.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true }),
    );

    await vi.advanceTimersByTime(1000);

    await vi.waitFor(() => {
      expect(localStorage.getItem("adopet_session")).toBeNull();
      expect(loginFeedback.textContent).toBe(
        "Não foi possível realizar o login. Tente novamente.",
      );
    });

    vi.useRealTimers();
  });

  it("should show error when database does not exist", async () => {
    vi.useFakeTimers();

    const { form, loginFeedback } = createLoginForm({
      email: "user@gmail.com",
      password: "123456",
    });

    document.body.append(form);

    await import("../src/js/login.js");

    form.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true }),
    );

    await vi.advanceTimersByTime(1000);

    await vi.waitFor(() => {
      expect(loginFeedback.textContent).toBe(
        "Não foi possível realizar o login. Tente novamente.",
      );
    });

    vi.useRealTimers();
  });

  it("should show error when users are empty", async () => {
    vi.useFakeTimers();

    const { form, loginFeedback } = createLoginForm({
      email: "user@gmail.com",
      password: "123456",
    });

    document.body.append(form);

    await import("../src/js/login.js");

    localStorage.setItem(
      "adopet",
      JSON.stringify({
        users: [],
      }),
    );

    form.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true }),
    );

    await vi.advanceTimersByTime(1000);

    await vi.waitFor(() => {
      expect(loginFeedback.textContent).toBe(
        "Não foi possível realizar o login. Tente novamente.",
      );
    });

    vi.useRealTimers();
  });
});
