export function createRegisterForm({
  name = "Usuário",
  email = "user@gmail.com",
  password = "123456",
  confirmPassword = "123456",
} = {}) {
  const form = document.createElement("form");
  form.dataset.registerForm = "";

  const nameField = document.createElement("input");
  nameField.name = "name";
  nameField.type = "text";
  nameField.value = name;
  nameField.required = true;
  nameField.dataset.field = "";

  const emailField = document.createElement("input");
  emailField.name = "email";
  emailField.type = "email";
  emailField.value = email;
  emailField.required = true;
  emailField.dataset.field = "";

  const passwordField = document.createElement("input");
  passwordField.name = "password";
  passwordField.type = "password";
  passwordField.value = password;
  passwordField.required = true;
  passwordField.dataset.field = "";

  const confirmPasswordField = document.createElement("input");
  confirmPasswordField.name = "confirmPassword";
  confirmPasswordField.type = "password";
  confirmPasswordField.value = confirmPassword;
  confirmPasswordField.required = true;
  confirmPasswordField.dataset.field = "";

  Object.defineProperty(form, "name", {
    value: nameField,
  });

  Object.defineProperty(form, "email", {
    value: emailField,
  });

  Object.defineProperty(form, "password", {
    value: passwordField,
  });
  Object.defineProperty(form, "confirmPassword", {
    value: confirmPasswordField,
  });

  const nameFeedback = document.createElement("span");
  nameFeedback.dataset.feedback = "name";

  const emailFeedback = document.createElement("span");
  emailFeedback.dataset.feedback = "email";

  const passwordFeedback = document.createElement("span");
  passwordFeedback.dataset.feedback = "password";

  const confirmPasswordFeedback = document.createElement("span");
  confirmPasswordFeedback.dataset.feedback = "confirmPassword";

  const registerFeedback = document.createElement("span");
  registerFeedback.dataset.feedback = "register";

  const button = document.createElement("button");
  button.dataset.buttonForm = "";

  form.append(
    nameField,
    nameFeedback,
    emailField,
    emailFeedback,
    passwordField,
    passwordFeedback,
    confirmPasswordField,
    confirmPasswordFeedback,
    registerFeedback,
    button,
  );

  return {
    form,
    nameField,
    emailField,
    passwordField,
    confirmPasswordField,
    nameFeedback,
    emailFeedback,
    passwordFeedback,
    confirmPasswordFeedback,
    registerFeedback,
    button,
  };
}
