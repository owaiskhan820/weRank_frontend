// src/components/auth/AuthValidation.js

// Basic email regex pattern for validation
const emailRegex = /\S+@\S+\.\S+/;

const validateEmail = (email) => {
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password.length > 6; // Example: password must be longer than 6 characters
};

const validateConfirmPassword = (password, confirmPassword) => {
  return password === confirmPassword;
};


const isFieldEmpty = (value) => {
    return value.trim() === '';
  };

// Add more validation functions as needed for different inputs

// A single function to validate all fields
const validateAll = ({ email, password, confirmPassword, mode, firstName, lastName, username  }) => {
  const errors = {};

  let allFields = { email, password };
  if (mode === 'signup') {
    allFields = { ...allFields, confirmPassword, firstName, lastName, username   };
  }

  for (const [key, value] of Object.entries(allFields)) {
    if (isFieldEmpty(value)) {
      errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} cannot be empty`; // Capitalizes the first letter of the key
    }
  }

  if (!validateEmail(email)) {
    errors.email = 'Invalid email address';
  }

  if (!validatePassword(password)) {
    errors.password = 'Password must be longer than 6 characters';
  }

  if (mode === 'signup' && !validateConfirmPassword(password, confirmPassword)) {
    errors.confirmPassword = 'Passwords do not match';
  }

  // Add more validation checks as needed
  // ...

  return errors;
};

export {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateAll, isFieldEmpty
};
