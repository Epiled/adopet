const form = document.querySelector("[data-register-form]");
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
      "Não foi possível realizar o cadastro, por favor tente mais tarde.",
  },
  name: {
    valueMissing: "O campo nome não pode estar vazio.",
    typeMismatch: "Por favor, preencha um nome.",
    tooShort: "Por favor, preencha um nome válido. Ex: João Silva",
    customError:
      "Não foi possível realizar o cadastro, por favor tente mais tarde.",
  },
  password: {
    valueMissing: "O campo de senha não pode estar vazio.",
    tooShort: "Por favor, preencha um senha válido.",
    customError:
      "Não foi possível realizar o cadastro, por favor tente mais tarde.",
  },
  confirmPassword: {
    valueMissing: "O campo de confirmar senha não pode estar vazio.",
    tooShort: "Por favor, preencha um senha válido.",
    customError:
      "Não foi possível realizar o cadastro, por favor tente mais tarde.",
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
    name: e.target.name.value,
    password: e.target.password.value,
    confirmPassword: e.target.confirmPassword.value,
  };

  register(dto);
});

async function register(dto) {
  const errorContainer = form.querySelector("[data-error='register']");

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
        "Não foi possível realizar o cadastro, email já registrado",
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

    errorContainer.dataset.state = "success";
    errorContainer.textContent = "Cadastro realizado com sucesso!";

    setTimeout(() => {
      window.location.href = "login.html";
    }, timeout * 4);
  } catch (error) {
    console.error(error);

    errorContainer.dataset.state = "visible";
    errorContainer.textContent =
      "Não foi possível realizar o cadastro. Tente novamente.";

    button.dataset.state = "default";
    button.disabled = false;
  }
}

function checkInput(field) {
  if (field.name === "confirmPassword") {
    const password = form.elements.password.value;
    const confirmPassword = field.value;

    if (password !== confirmPassword) {
      field.setCustomValidity("passwordMismatch");
      errorsFeedback.confirmPassword.customError = "As senhas não coincidem.";
    } else {
      field.setCustomValidity("");
    }
  }

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
