// Mensagens de erro centralizadas
export const ERROR_VALIDATION_MESSAGES = {
  name: {
    required: "Name is required",
    minLength: "Name must be at least 2 characters",
  },
  phone: {
    required: "Phone is required",
    minLength: "Phone must be at least 11 characters",
    invalid: "Invalid phone number",
  },
  email: {
    required: "Email Address is required",
    invalid: "Invalid email address",
  },
  password: {
    required: "Password is required",
    minLength: "Password must be at least 8 characters",
  },
  confirmPassword: {
    required: "Confirm Password is required",
    mismatch: "Passwords do not match",
  },
};
