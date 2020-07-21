export function validateLoginInput(loginInput) {
  if (!loginInput.username) {
    return "Username can not be empty";
  } else if (!loginInput.password) {
    return "Password can not be empty";
  }
  return "";
}

export function validateRegisterInput(registerInput) {
  if (!registerInput.username) {
    return "Username can not be empty";
  } else if (!registerInput.email) {
    return "Email can not be empty";
  } else if (!registerInput.password) {
    return "Password can not be empty";
  } else if (!registerInput.confirmPassword) {
    return "Confirm password can not be empty";
  } else if (!isValidEmail(registerInput.email)) {
    return "Invalid email entered";
  } else if (registerInput.password !== registerInput.confirmPassword) {
    return "Passwords do not match";
  }
  return "";
}

function isValidEmail(email) {
  const regularExpression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regularExpression.test(String(email).toLowerCase());
}
