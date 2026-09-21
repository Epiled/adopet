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
  phone: {
    valueMissing: "O campo telefone não pode estar vazio.",
    tooShort: "O telefone deve ter pelo menos 10 caracteres.",
    patternMismatch: "Insira um telefone válido. Ex: (55) 11 9",
  },
  animalName: {
    valueMissing: "O campo nome do animal não pode estar vazio.",
    tooShort: "O nome do animal deve ter pelo menos 2 caracteres.",
  },
  message: {
    valueMissing: "O campo mensagem não pode estar vazio.",
    tooShort: "A mensagem deve ter pelo menos 10 caracteres.",
  },
  city: {
    tooShort: "A cidade deve ter pelo menos 3 caracteres.",
  },
  about: {
    tooShort: "A descrição deve ter pelo menos 10 caracteres.",
  },
};
