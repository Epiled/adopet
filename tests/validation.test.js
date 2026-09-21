import { describe, expect, it } from "vitest";
import { checkInput } from "../src/js/validation/validation";
import { createFormField } from "./helpers/createFormField";

describe("checkInput", () => {
  it("should return true for a valid field", () => {
    const { form, field, feedback } = createFormField({
      name: "email",
      type: "email",
      value: "usuario@email.com",
    });

    expect(checkInput(field, form)).toBe(true);
    expect(field.dataset.state).toBe("default");
    expect(feedback.dataset.state).toBe("hidden");
    expect(feedback.textContent).toBe("");
  });

  it("should return false when a required field is empty", () => {
    const { form, field, feedback } = createFormField({
      name: "password",
      type: "password",
      value: "",
      required: true,
    });

    expect(checkInput(field, form)).toBe(false);
    expect(field.dataset.state).toBe("error");
    expect(feedback.dataset.state).toBe("visible");
    expect(feedback.textContent).toBe("O campo de senha não pode estar vazio.");
  });

  it("should return false when email is invalid", () => {
    const { form, field, feedback } = createFormField({
      name: "email",
      type: "email",
      value: "usuario",
    });

    expect(checkInput(field, form)).toBe(false);
    expect(field.dataset.state).toBe("error");
    expect(feedback.dataset.state).toBe("visible");
  });

  it("should return false when phone format is invalid", () => {
    const { form, field, feedback } = createFormField({
      name: "phone",
      type: "tel",
      value: "11999999999",
      pattern: "^\\+55 \\(\\d{2}\\) \\d{4}-\\d{4}$",
    });

    expect(checkInput(field, form)).toBe(false);
    expect(field.dataset.state).toBe("error");
    expect(feedback.dataset.state).toBe("visible");
  });

  it("should return true when phone format is valid", () => {
    const { form, field, feedback } = createFormField({
      name: "phone",
      type: "tel",
      value: "+55 (11) 9999-9999",
      pattern: "^\\+55 \\(\\d{2}\\) \\d{4}-\\d{4}$",
    });

    expect(checkInput(field, form)).toBe(true);
    expect(field.dataset.state).toBe("default");
    expect(feedback.dataset.state).toBe("hidden");
  });

  it("should return false when passwords do not match", () => {
    const { field: password } = createFormField({
      name: "password",
      type: "password",
      value: "123456",
    });

    const {
      form,
      field: confirmPassword,
      feedback,
    } = createFormField({
      name: "confirmPassword",
      type: "password",
      value: "789456",
    });

    form.append(password);

    expect(checkInput(confirmPassword, form)).toBe(false);
    expect(confirmPassword.dataset.state).toBe("error");
    expect(feedback.dataset.state).toBe("visible");
  });

  it("should return true when passwords match", () => {
    const { field: password } = createFormField({
      name: "password",
      type: "password",
      value: "123456",
    });

    const {
      form,
      field: confirmPassword,
      feedback,
    } = createFormField({
      name: "confirmPassword",
      type: "password",
      value: "123456",
    });

    form.append(password);

    expect(checkInput(confirmPassword, form)).toBe(true);
    expect(confirmPassword.dataset.state).toBe("default");
    expect(feedback.dataset.state).toBe("hidden");
  });

  it("should reset field state when field becomes valid", () => {
    const { form, field, feedback } = createFormField({
      name: "email",
      type: "email",
      value: "usuario@email.com",
    });
    field.dataset.state = "error";

    feedback.dataset.feedback = "email";
    feedback.dataset.state = "visible";
    feedback.textContent = "E-mail inválido.";

    expect(checkInput(field, form)).toBe(true);
    expect(field.dataset.state).toBe("default");
    expect(feedback.dataset.state).toBe("hidden");
    expect(feedback.textContent).toBe("");
  });
});
