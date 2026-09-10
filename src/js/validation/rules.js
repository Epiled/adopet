export const validationRules = {
  confirmPassword: {
    matches: "password",
  },

  newPassword: {
    differentFrom: "currentPassword",
  },
};
