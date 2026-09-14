export function createLoginForm({
  email = "user@gmail.com",
  password = "123456",
} = {}) {
  const form = document.createElement("form");
  form.dataset.loginForm = "";

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

  Object.defineProperty(form, "email", {
    value: emailField,
  });

  Object.defineProperty(form, "password", {
    value: passwordField,
  });

  
  const emailFeedback = document.createElement("span");
  emailFeedback.dataset.feedback = "email";
  
  const passwordFeedback = document.createElement("span");
  passwordFeedback.dataset.feedback = "password";
  
  const loginFeedback  = document.createElement("span");
  loginFeedback .dataset.feedback = "login";

  const button = document.createElement("button");
  button.dataset.buttonForm = "";

  form.append(
    emailField,
    emailFeedback,
    passwordField,
    passwordFeedback,
    loginFeedback,
    button,
  );

  return {
    form,
    emailField,
    passwordField,
    emailFeedback,
    passwordFeedback,
    loginFeedback,
    button,
  };
}
