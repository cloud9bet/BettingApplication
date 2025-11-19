const passwordRules = {
  minLength: 12,
  hasUpper: /[A-Z]/,
  hasLower: /[a-z]/,
  hasDigit: /[0-9]/,
  hasSpecial: /[^A-Za-z0-9]/,
};

export function validatePassword(password, passwordAgain) {
  const errors = [];
  if (password.length < passwordRules.minLength)
    errors.push("Password must be at least 12 characters ");

  if (!passwordRules.hasUpper.test(password))
    errors.push("Password must contain at least one uppercase letter ");

  if (!passwordRules.hasLower.test(password))
    errors.push("Password must contain at least one lowercase letter ");

  if (!passwordRules.hasDigit.test(password))
    errors.push("Password must contain at least one number ");

  if (!passwordRules.hasSpecial.test(password))
    errors.push("Password must contain at least one special character ");

  if(password != passwordAgain){
    errors.push("Password must be the same ");
  }
  
  return errors;
}
