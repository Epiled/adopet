const buttons = document.querySelectorAll("[data-button-toggle]");
const fields = document.querySelectorAll("[data-field]");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const field = Array.from(fields).find((field) => {
      return field.dataset.field === button.dataset.buttonToggle;
    });

    if (!field) return;

    if (field.type === "password") {
      field.type = "text";
      button.dataset.state = "visible";
    } else {
      field.type = "password";
      button.dataset.state = "hidden";
    }
  });
});
