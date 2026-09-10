import { checkInput } from "./validation/validation.js";

const form = document.querySelector("[data-contact-form]");
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
    animalName: e.target.animalName.value,
    message: e.target.message.value,
  };

  contact(dto);
});

async function contact(dto) {
  const feedbackContainer = form.querySelector("[data-feedback='contact']");

  feedbackContainer.dataset.state = "hidden";
  feedbackContainer.textContent = "";

  button.dataset.state = "loading";
  button.disabled = true;

  try {
    await new Promise((resolve) => setTimeout(resolve, timeout));

    console.log(dto);

    button.dataset.state = "success";
    button.textContent = "Enviado!";

    feedbackContainer.dataset.state = "success";
    feedbackContainer.textContent = "Menssagem enviada com sucesso!";
  } catch (error) {
    console.error(error);

    button.dataset.state = "default";
    button.disabled = false;

    feedbackContainer.dataset.state = "visible";
    feedbackContainer.textContent =
      "Não foi possível enviar sua menssagem. Tente novamente.";
  }
}
