import { validationRules } from "./rules.js";
import { validationMessages } from "./messages.js";

export function checkInput(field, form) {
  const rules = validationRules[field.name];

  if (rules?.matches) {
    const targetField = form.elements[rules.matches];

    if (field.value !== targetField.value) {
      field.setCustomValidity("customError");
    } else {
      field.setCustomValidity("");
    }
  }

  const feedback = Object.keys(validationMessages[field.name] ?? {}).find(
    (type) => field.validity[type],
  );

  const message = feedback ? validationMessages[field.name][feedback] : "";

  const feedbackContainer = form.querySelector(`[data-error='${field.name}']`);

  if (!field.checkValidity()) {
    field.dataset.state = "error";
    feedbackContainer.dataset.state = "visible";
    feedbackContainer.textContent = message;
    return false;
  }

  field.dataset.state = "default";
  feedbackContainer.dataset.state = "hidden";
  feedbackContainer.textContent = "";

  return true;
}
