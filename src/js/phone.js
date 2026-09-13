const field = document.querySelector("[data-field='phone']");

field.addEventListener("input", () => {
  let value = field.value.replace(/\D/g, "");

  if (value.startsWith("55")) {
    value = value.slice(2);
  }

  if (value.length > 11) {
    value = value.slice(0, 11);
  }

  if (value.length <= 10) {
    value = value.replace(/^(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d{4})(\d)/, "$1-$2");
  } else {
    value = value.replace(/^(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d)(\d{4})(\d{4})$/, "$1 $2-$3");
  }

  field.value = value ? `+55 ${value}` : "";
});
