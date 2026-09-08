export const validationMessages = {
  email: {
    valueMissing: "O campo de e-mail não pode estar vazio.",
    typeMismatch: "Por favor, informe um e-mail válido.",
    tooShort: "O e-mail deve ter pelo menos 5 caracteres.",
  },
  name: {
    valueMissing: "O campo nome não pode estar vazio.",
    tooShort: "O nome deve ter pelo menos 3 caracteres.",
  },
  password: {
    valueMissing: "O campo de senha não pode estar vazio.",
    tooShort: "A senha deve ter pelo menos 8 caracteres.",
  },
  confirmPassword: {
    valueMissing: "O campo de confirmação de senha não pode estar vazio.",
    tooShort: "A senha deve ter pelo menos 8 caracteres.",
    customError: "As senhas não coincidem.",
  },
};
