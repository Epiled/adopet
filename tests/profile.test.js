import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createProfileForm } from "./helpers/createProfileForm";

vi.mock("../src/js/database.js", () => ({
  initializeDatabase: vi.fn(),
}));

vi.mock("../src/js/auth.js", () => ({
  requireAuth: vi.fn(),
}));

const updateProfileImageMock = vi.fn();

vi.mock("../src/js/profile-image.js", () => ({
  loadProfileImage: vi.fn(),
  updateProfileImage: updateProfileImageMock,
}));

describe("profile", () => {
  beforeEach(() => {
    vi.resetModules();
    localStorage.clear();
    document.body.innerHTML = "";
    localStorage.removeItem("adopet");
    localStorage.removeItem("adopet_session");
    updateProfileImageMock.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.resetModules();
  });

  it("should update the profile successfully", async () => {
    vi.useFakeTimers();

    localStorage.setItem(
      "adopet",
      JSON.stringify({
        users: [
          {
            id: "f7af5bca-5a70-42cc-8292-94a7ba9bef72",
            photo: null,
            name: "Usuário",
            email: "user@gmail.com",
            password: "123456",
            about: null,
            city: null,
            role: "user",
            created_at: "2026-09-07T18:49:17.862Z",
            updated_at: "2026-09-07T18:49:17.862Z",
          },
        ],
      }),
    );

    const originalUser = JSON.parse(localStorage.getItem("adopet"));

    localStorage.setItem(
      "adopet_session",
      JSON.stringify({
        id: "f7af5bca-5a70-42cc-8292-94a7ba9bef72",
        photo: null,
        name: "Usuário",
        email: "user@gmail.com",
        about: null,
        city: null,
        role: "user",
        created_at: "2026-09-07T18:49:17.862Z",
        updated_at: "2026-09-07T18:49:17.862Z",
      }),
    );

    const originalSession = JSON.parse(localStorage.getItem("adopet_session"));

    const { form, profileFeedback, button } = createProfileForm({
      photo: null,
      name: "Usuário",
      phone: null,
      city: null,
      about: null,
    });

    document.body.append(form);

    await import("../src/js/profile.js");

    form.elements.name.value = "Felipe";
    form.elements.phone.value = "11 9 8765-4321";
    form.elements.city.value = "Sorocaba";
    form.elements.about.value =
      "Uma pessoa sem descrição, apenas um teste 20/09/2026!";

    form.requestSubmit();

    await vi.advanceTimersByTimeAsync(1000);

    const newUser = JSON.parse(localStorage.getItem("adopet"));

    const newSession = JSON.parse(localStorage.getItem("adopet_session"));

    const updatedUser = newUser.users.find(
      (user) => user.id === originalUser.users[0].id,
    );

    expect(updatedUser).toMatchObject({
      id: originalUser.users[0].id,
      name: "Felipe",
      phone: "11 9 8765-4321",
      city: "Sorocaba",
      about: "Uma pessoa sem descrição, apenas um teste 20/09/2026!",
      photo: null,
      email: originalUser.users[0].email,
      password: originalUser.users[0].password,
      role: originalUser.users[0].role,
      created_at: originalUser.users[0].created_at,
    });
    expect(updatedUser.updated_at).toBeDefined();
    expect(updatedUser.updated_at).not.toBe(originalUser.users[0].updated_at);
    expect(updatedUser.password).toBeDefined();
    expect(newSession).toMatchObject({
      id: originalSession.id,
      name: "Felipe",
      phone: "11 9 8765-4321",
      city: "Sorocaba",
      about: "Uma pessoa sem descrição, apenas um teste 20/09/2026!",
      photo: null,
      email: originalSession.email,
      role: originalSession.role,
      created_at: originalSession.created_at,
    });
    expect(newSession.password).toBeUndefined();
    expect(profileFeedback.textContent).toBe("Perfil atualizado com sucesso!");
    expect(button.textContent).toBe("Salvo!");
    expect(updateProfileImageMock).toHaveBeenCalledWith(null);
  });

  it("should show error when database does not exist", async () => {
    vi.useFakeTimers();

    localStorage.setItem(
      "adopet_session",
      JSON.stringify({
        id: "f7af5bca-5a70-42cc-8292-94a7ba9bef72",
        name: "Usuário",
        email: "user@gmail.com",
        photo: null,
      }),
    );

    const { form, profileFeedback, button } = createProfileForm();

    document.body.append(form);

    await import("../src/js/profile.js");

    form.requestSubmit();

    await vi.advanceTimersByTimeAsync(1000);

    expect(profileFeedback.textContent).toBe(
      "Não foi possível atualizar seu perfil. Tente novamente.",
    );
    expect(button.dataset.state).toBe("default");
    expect(button.disabled).toBe(false);
    expect(localStorage.getItem("adopet")).toBeNull();
  });

  it("should show error when users is invalid", async () => {
    vi.useFakeTimers();

    localStorage.setItem(
      "adopet",
      JSON.stringify({
        users: null,
      }),
    );

    localStorage.setItem(
      "adopet_session",
      JSON.stringify({
        id: "f7af5bca-5a70-42cc-8292-94a7ba9bef72",
      }),
    );

    const { form, profileFeedback, button } = createProfileForm();

    document.body.append(form);

    await import("../src/js/profile.js");

    form.requestSubmit();

    await vi.advanceTimersByTimeAsync(1000);

    expect(profileFeedback.textContent).toBe(
      "Não foi possível atualizar seu perfil. Tente novamente.",
    );
    expect(button.dataset.state).toBe("default");
    expect(button.disabled).toBe(false);
  });

  it("should show error when session has no user id", async () => {
    vi.useFakeTimers();

    localStorage.setItem(
      "adopet",
      JSON.stringify({
        users: [
          {
            id: "f7af5bca-5a70-42cc-8292-94a7ba9bef72",
          },
        ],
      }),
    );

    localStorage.setItem(
      "adopet_session",
      JSON.stringify({
        id: null,
      }),
    );

    const { form, profileFeedback, button } = createProfileForm();

    document.body.append(form);

    await import("../src/js/profile.js");

    form.requestSubmit();

    await vi.advanceTimersByTimeAsync(1000);

    expect(profileFeedback.textContent).toBe(
      "Não foi possível atualizar seu perfil. Tente novamente.",
    );
    expect(button.dataset.state).toBe("default");
    expect(button.disabled).toBe(false);
  });

  it("should show error when user is not found in database", async () => {
    vi.useFakeTimers();

    localStorage.setItem(
      "adopet",
      JSON.stringify({
        users: [
          {
            id: "f7af5bca-5a70-42cc-8292-94a7ba9bef72",
          },
        ],
      }),
    );

    localStorage.setItem(
      "adopet_session",
      JSON.stringify({
        id: "4c2d011d-3dc2-411d-a4c1-425b0d9c3b59",
      }),
    );

    const originalDatabase = localStorage.getItem("adopet");

    const { form, profileFeedback, button } = createProfileForm();

    document.body.append(form);

    await import("../src/js/profile.js");

    form.requestSubmit();

    await vi.advanceTimersByTimeAsync(1000);

    expect(profileFeedback.textContent).toBe(
      "Não foi possível atualizar seu perfil. Tente novamente.",
    );
    expect(button.dataset.state).toBe("default");
    expect(button.disabled).toBe(false);
    expect(localStorage.getItem("adopet")).toBe(originalDatabase);
  });

  it("should update image profile with new photo", async () => {
    vi.useFakeTimers();

    const file = new File(["image test"], "profile.png", {
      type: "image/png",
    });

    const base64 = "data:image/png;base64,dGVzdGU=";

    const readAsDataURLMock = vi.fn(function () {
      this.result = base64;
      this.onload();
    });

    vi.stubGlobal(
      "FileReader",
      vi.fn(function () {
        this.onload = null;
        this.result = null;
        this.readAsDataURL = readAsDataURLMock;
      }),
    );

    localStorage.setItem(
      "adopet",
      JSON.stringify({
        users: [
          {
            id: "f7af5bca-5a70-42cc-8292-94a7ba9bef72",
            photo: null,
            name: "Usuário",
            email: "user@gmail.com",
            password: "123456",
            about: null,
            city: null,
            role: "user",
            created_at: "2026-09-07T18:49:17.862Z",
            updated_at: "2026-09-07T18:49:17.862Z",
          },
        ],
      }),
    );

    localStorage.setItem(
      "adopet_session",
      JSON.stringify({
        id: "f7af5bca-5a70-42cc-8292-94a7ba9bef72",
        photo: null,
        name: "Usuário",
        email: "user@gmail.com",
        about: null,
        city: null,
        role: "user",
        created_at: "2026-09-07T18:49:17.862Z",
        updated_at: "2026-09-07T18:49:17.862Z",
      }),
    );

    const { form } = createProfileForm();

    document.body.append(form);

    await import("../src/js/profile.js");

    Object.defineProperty(form.elements.photo, "files", {
      configurable: true,
      value: {
        0: file,
        length: 1,
        item: (index) => (index === 0 ? file : null),
      },
    });

    form.requestSubmit();

    await vi.advanceTimersByTimeAsync(1000);

    const newUser = JSON.parse(localStorage.getItem("adopet"));
    const newSession = JSON.parse(localStorage.getItem("adopet_session"));

    const updatedUser = newUser.users[0];

    expect(updatedUser.photo).toBe(base64);
    expect(newSession.photo).toBe(base64);
    expect(readAsDataURLMock).toHaveBeenCalledWith(file);
    expect(updateProfileImageMock).toHaveBeenCalledWith(base64);
  });
});
