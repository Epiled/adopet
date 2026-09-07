const form = document.querySelector("[data-login-form]");
const fields = document.querySelectorAll("[data-field]");
const button = document.querySelector("[data-button-form]");
const timeout = 1000;

const errorsTypes = ["valueMissing", "typeMismatch", "tooShort", "customError"];

const errorsFeedback = {
  email: {
    valueMissing: "O campo de e-mail não pode estar vazio.",
    typeMismatch: "Por favor, preencha um e-mail válido.",
    tooShort: "Por favor, preencha um e-mail válido. Ex: email@contato.com",
    customError:
      "Não foi possível realizar o login, verifique os campos e-mail e senha",
  },
  password: {
    valueMissing: "O campo de senha não pode estar vazio.",
    tooShort: "Por favor, preencha um senha válido.",
    customError:
      "Não foi possível realizar o login, verifique os campos e-mail e senha",
  },
};

fields.forEach((field) => {
  field.addEventListener("blur", () => {
    checkInput(field);
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
    checkInput(field);
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
  const errorContainer = form.querySelector("[data-error='login']");
  errorContainer.dataset.state = "hidden";
  errorContainer.textContent = "";

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

    errorContainer.dataset.state = "visible";
    errorContainer.textContent =
      "Não foi possível realizar o login. Tente novamente.";
  } finally {
    button.dataset.state = "default";
    button.disabled = false;
  }
}

function checkInput(field) {
  const error = errorsTypes.find((error) => field.validity[error]);

  const message = error ? errorsFeedback[field.name][error] : "";

  const errorContainer = form.querySelector(`[data-error='${field.name}']`);

  if (!field.checkValidity()) {
    field.dataset.state = "error";
    errorContainer.dataset.state = "visible";
    errorContainer.textContent = message;
    return;
  }

  field.dataset.state = "default";
  errorContainer.dataset.state = "hidden";
  errorContainer.textContent = "";
}
