export function createFormField({
  name,
  type = "test",
  value = "",
  required = false,
  pattern,
}) {
  const form = document.createElement("form");

  const field = document.createElement("input");
  field.name = name;
  field.type = type;
  field.value = value;
  field.required = required;

  if (pattern) {
    field.pattern = pattern;
  }

  const feedback = document.createElement("span");
  feedback.dataset.feedback = name;
  feedback.dataset.state = "";

  form.append(field, feedback);

  return {
    form,
    field,
    feedback,
  };
}
