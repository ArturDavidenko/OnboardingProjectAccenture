const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const loginError = document.getElementById("loginError");

const showRegisterBtn = document.getElementById("showRegisterBtn");
const registerAction = document.getElementById("registerAction");
const registerBox = document.getElementById("registerBox");

const registerForm = document.getElementById("registerForm");
const regName = document.getElementById("reg-name");
const regSurname = document.getElementById("reg-surname");
const regEmail = document.getElementById("reg-email");
const regEmailAgain = document.getElementById("reg-email-again");
const regPassword = document.getElementById("reg-password");
const regPasswordAgain = document.getElementById("reg-password-again");
const registerError = document.getElementById("registerError");

document.addEventListener("DOMContentLoaded", function () {
  redirectIfLoggedIn("../homePage/home.html");
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function containsAtLeastTwoLetters(value) {
  const lettersOnly = value.replace(/[^a-zA-Z]/g, "");
  return lettersOnly.length >= 2;
}

function validateLoginFields(emailValue, passwordValue) {
  if (emailValue === "" || passwordValue === "") {
    return "Please fill in both email and password.";
  }

  if (!isValidEmail(emailValue)) {
    return "Please enter a valid email address.";
  }

  return "";
}

function validateRegisterFields(
  nameValue,
  surnameValue,
  emailValue,
  emailAgainValue,
  passwordValue,
  passwordAgainValue
) {
  if (nameValue === "") {
    return "Name cannot be empty.";
  }

  if (!containsAtLeastTwoLetters(nameValue)) {
    return "Name must contain at least 2 letters.";
  }

  if (surnameValue !== "" && !containsAtLeastTwoLetters(surnameValue)) {
    return "Surname must contain at least 2 letters if provided.";
  }

  if (emailValue === "") {
    return "Email cannot be empty.";
  }

  if (!isValidEmail(emailValue)) {
    return "Please enter a valid email address.";
  }

  if (emailAgainValue === "") {
    return "Email again cannot be empty.";
  }

  if (emailValue !== emailAgainValue) {
    return "Email fields must match.";
  }

  if (passwordValue === "") {
    return "Password cannot be empty.";
  }

  if (passwordValue.length < 8) {
    return "Password must be at least 8 characters long.";
  }

  if (passwordAgainValue === "") {
    return "Password again cannot be empty.";
  }

  if (passwordValue !== passwordAgainValue) {
    return "Password fields must match.";
  }

  return "";
}

/* -------------------- LOGIN -------------------- */
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const emailValue = loginEmail.value.trim();
  const passwordValue = loginPassword.value.trim();

  loginError.textContent = "";

  const loginValidationMessage = validateLoginFields(emailValue, passwordValue);

  if (loginValidationMessage !== "") {
    loginError.textContent = loginValidationMessage;
    return;
  }

  const registeredUsers = getRegisteredUsers();

  const foundUser = registeredUsers.find(function (user) {
    return (
      user.email.toLowerCase() === emailValue.toLowerCase() &&
      user.password === passwordValue
    );
  });

  if (!foundUser) {
    loginError.textContent = "Invalid email or password.";
    return;
  }

  setCurrentUser({
    name: foundUser.name,
    surname: foundUser.surname,
    email: foundUser.email
  });

  window.location.href = "../homePage/home.html";
});


showRegisterBtn.addEventListener("click", function () {
  registerBox.classList.remove("hidden");
  registerAction.classList.add("hidden");
});


registerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const nameValue = regName.value.trim();
  const surnameValue = regSurname.value.trim();
  const emailValue = regEmail.value.trim();
  const emailAgainValue = regEmailAgain.value.trim();
  const passwordValue = regPassword.value.trim();
  const passwordAgainValue = regPasswordAgain.value.trim();

  registerError.textContent = "";

  const validationMessage = validateRegisterFields(
    nameValue,
    surnameValue,
    emailValue,
    emailAgainValue,
    passwordValue,
    passwordAgainValue
  );

  if (validationMessage !== "") {
    registerError.textContent = validationMessage;
    return;
  }

  const registeredUsers = getRegisteredUsers();

  const emailAlreadyExists = registeredUsers.some(function (user) {
    return user.email.toLowerCase() === emailValue.toLowerCase();
  });

  if (emailAlreadyExists) {
    registerError.textContent = "A user with this email already exists.";
    return;
  }

  const newUser = {
    name: nameValue,
    surname: surnameValue,
    email: emailValue,
    password: passwordValue
  };

  registeredUsers.push(newUser);
  saveRegisteredUsers(registeredUsers);

  setCurrentUser({
    name: newUser.name,
    surname: newUser.surname,
    email: newUser.email
  });

  window.location.href = "../homePage/home.html";
});