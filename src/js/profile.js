import { checkInput } from "./validation/validation.js";

const form = document.querySelector("[data-profile-form]");
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
    name: e.target.name.value,
    phone: e.target.phone.value,
    city: e.target.city.value,
    about: e.target.about.value,
  };

  profile(dto);
});

async function profile(dto) {
  const feedbackContainer = form.querySelector("[data-feedback='profile']");
  feedbackContainer.dataset.state = "hidden";
  feedbackContainer.textContent = "";

  button.dataset.state = "loading";
  button.disabled = true;

  try {
    await new Promise((resolve) => setTimeout(resolve, timeout));

    console.log(dto);

    button.dataset.state = "success";
    button.textContent = "Salvo!";

    feedbackContainer.dataset.state = "success";
    feedbackContainer.textContent = "Perfil atualizado com sucesso!";

    setTimeout(() => {
      feedbackContainer.dataset.state = "hidden";
      feedbackContainer.textContent = "";

      button.disabled = false;
      button.dataset.state = "default";
      button.textContent = "Salvar";
    }, timeout * 3);
  } catch (error) {
    console.error(error);

    button.dataset.state = "default";
    button.disabled = false;

    feedbackContainer.dataset.state = "visible";
    feedbackContainer.textContent =
      "Não foi atualizar seu perfil. Tente novamente.";
  }
}
