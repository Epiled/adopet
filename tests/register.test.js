import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createRegisterForm } from "./helpers/createRegisterForm.js";

vi.mock("../src/js/database.js", () => ({
  initializeDatabase: vi.fn(),
}));

vi.mock("../src/js/auth.js", () => ({
  redirectAuthenticated: vi.fn(),
}));

describe("register", () => {
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

  it("should register a new user", async () => {
    vi.useFakeTimers();

    const { form, emailField } = createRegisterForm();

    document.body.append(form);

    await import("../src/js/register.js");

    localStorage.setItem(
      "adopet",
      JSON.stringify({
        users: [],
      }),
    );

    form.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true }),
    );

    await vi.advanceTimersByTimeAsync(1000);

    const db = localStorage.getItem("adopet");
    const { users } = JSON.parse(db);
    const match = users.find((item) => {
      return item.email === emailField.value;
    });

    expect(match).toMatchObject({
      photo: null,
      name: "Usuário",
      email: "user@gmail.com",
      password: "123456",
      about: null,
      city: null,
      role: "user",
    });
    expect(match.id).toBeDefined();
    expect(match.created_at).toBeDefined();
    expect(match.updated_at).toBeDefined();
  });

  it("should not register same email", async () => {
    vi.useFakeTimers();

    const { form, registerFeedback } = createRegisterForm();

    document.body.append(form);

    await import("../src/js/register.js");

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

    await vi.advanceTimersByTimeAsync(1000);

    const db = JSON.parse(localStorage.getItem("adopet"));

    expect(db.users).toHaveLength(1);
    expect(registerFeedback.textContent).toBe(
      "Não foi possível realizar o cadastro. Tente novamente.",
    );
  });

  it("should show error when database does not exist", async () => {
    vi.useFakeTimers();

    const { form, registerFeedback } = createRegisterForm();

    document.body.append(form);

    await import("../src/js/register.js");

    form.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true }),
    );

    await vi.advanceTimersByTimeAsync(1000);

    expect(registerFeedback.textContent).toBe(
      "Não foi possível realizar o cadastro. Tente novamente.",
    );
  });

  it("should show error when users are not array", async () => {
    vi.useFakeTimers();

    const { form, registerFeedback } = createRegisterForm();

    document.body.append(form);

    await import("../src/js/register.js");

    localStorage.setItem(
      "adopet",
      JSON.stringify({
        users: null,
      }),
    );

    form.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true }),
    );

    await vi.advanceTimersByTimeAsync(1000);

    const db = JSON.parse(localStorage.getItem("adopet"));

    expect(Array.isArray(db.users)).toBe(false);
    expect(registerFeedback.textContent).toBe(
      "Não foi possível realizar o cadastro. Tente novamente.",
    );
  });
});
