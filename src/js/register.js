import { checkInput } from "./validation/validation.js";

const form = document.querySelector("[data-register-form]");
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
    name: e.target.name.value,
    password: e.target.password.value,
    confirmPassword: e.target.confirmPassword.value,
  };

  register(dto);
});

async function register(dto) {
  const feedbackContainer = form.querySelector("[data-feedback='register']");

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

    const data = JSON.parse(db);
    const { users } = data;

    if (!Array.isArray(users)) {
      throw new Error("Dados de usuários inválidos.");
    }

    const match = users.find((item) => {
      return dto.email === item.email;
    });

    if (match) {
      throw new Error(
        "Não foi possível realizar o cadastro, email já registrado.",
      );
    }

    const timestamp = new Date().toISOString();

    const userData = {
      id: crypto.randomUUID(),
      photo: null,
      name: dto.name,
      email: dto.email,
      password: dto.password,
      about: null,
      city: null,
      role: "user",
      created_at: timestamp,
      updated_at: timestamp,
    };

    users.push(userData);

    localStorage.setItem("adopet", JSON.stringify(data));

    button.dataset.state = "default";

    feedbackContainer.dataset.state = "success";
    feedbackContainer.textContent = "Cadastro realizado com sucesso!";

    setTimeout(() => {
      window.location.href = "login.html";
    }, timeout * 4);
  } catch (error) {
    console.error(error);

    feedbackContainer.dataset.state = "visible";
    feedbackContainer.textContent =
      "Não foi possível realizar o cadastro. Tente novamente.";

    button.dataset.state = "default";
    button.disabled = false;
  }
}
