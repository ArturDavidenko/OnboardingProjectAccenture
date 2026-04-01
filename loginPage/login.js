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

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function containsAtLeastTwoLetters(value) {
  const lettersOnly = value.replace(/[^a-zA-Z]/g, "");
  return lettersOnly.length >= 2;
}

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const emailValue = loginEmail.value.trim();
  const passwordValue = loginPassword.value.trim();

  loginError.textContent = "";

  if (emailValue === "" || passwordValue === "") {
    loginError.textContent = "Please fill in both email and password.";
    return;
  }

  if (!isValidEmail(emailValue)) {
    loginError.textContent = "Please enter a valid email address.";
    return;
  }

  window.location.href = "../homePage/home.html";
});

showRegisterBtn.addEventListener("click", function () {
  registerBox.classList.remove("hidden");
  registerAction.classList.add("hidden");
});


function validateInputFields(
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

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const nameValue = regName.value.trim();
  const surnameValue = regSurname.value.trim();
  const emailValue = regEmail.value.trim();
  const emailAgainValue = regEmailAgain.value.trim();
  const passwordValue = regPassword.value.trim();
  const passwordAgainValue = regPasswordAgain.value.trim();

  registerError.textContent = "";

  const validationMessage = validateInputFields(
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

  window.location.href = "../homePage/home.html";
});