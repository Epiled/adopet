import { checkInput } from "./validation/validation.js";
import { initializeDatabase } from "./database.js";

await initializeDatabase();

const form = document.querySelector("[data-login-form]");
const fields = document.querySelectorAll("[data-field]");
const button = document.querySelector("[data-button-form]");
const timeout = 1000;

fields.forEach((field) => {
  field.addEventListener("blur", () => {
    checkInput(field, form);
  });
  field.addEventListener("input", () => {
    field.setCustomValidity("");
  });
  field.addEventListener("invalid", (e) => {
    e.preventDefault();
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  fields.forEach((field) => {
    checkInput(field, form);
  });

  if (!form.checkValidity()) {
    return;
  }

  const dto = {
    email: e.target.email.value,
    password: e.target.password.value,
  };

  login(dto);
});

async function login(dto) {
  const feedbackContainer = form.querySelector("[data-feedback='login']");

  feedbackContainer.dataset.state = "hidden";
  feedbackContainer.textContent = "";

  button.dataset.state = "loading";
  button.disabled = true;

  try {
    await new Promise((resolve) => setTimeout(resolve, timeout));

    const db = localStorage.getItem("adopet");

    if (!db) {
      throw new Error("Banco de dados não encontrado.");
    }

    const { users } = JSON.parse(db);

    if (!Array.isArray(users)) {
      throw new Error("Dados de usuários inválidos.");
    }

    const match = users.find((item) => {
      return dto.email === item.email && dto.password === item.password;
    });

    if (!match) {
      throw new Error(
        "Não foi possível realizar o login, verifique seu e-mail e senha.",
      );
    }

    const userData = { ...match };

    delete userData.password;

    localStorage.setItem("adopet_session", JSON.stringify(userData));

    window.location.href = "home.html";
  } catch (error) {
    console.error(error);

    feedbackContainer.dataset.state = "visible";
    feedbackContainer.textContent =
      "Não foi possível realizar o login. Tente novamente.";
  } finally {
    button.dataset.state = "default";
    button.disabled = false;
  }
}
