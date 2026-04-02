const profileName = document.getElementById("profileName");
const profileSurname = document.getElementById("profileSurname");
const profileEmail = document.getElementById("profileEmail");
const resetEmailBtn = document.getElementById("resetEmailBtn");

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function displayProfileData() {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    window.location.href = "../loginPage/login.html";
    return;
  }

  profileName.textContent = currentUser.name;
  profileSurname.textContent = currentUser.surname;
  profileEmail.textContent = currentUser.email;
}

function moveUserMoviesToNewEmail(oldEmail, newEmail) {
  const oldKey = `yourMovies_${oldEmail.toLowerCase()}`;
  const newKey = `yourMovies_${newEmail.toLowerCase()}`;

  const moviesData = localStorage.getItem(oldKey);

  if (moviesData) {
    localStorage.setItem(newKey, moviesData);
    localStorage.removeItem(oldKey);
  }
}

function resetEmail() {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    window.location.href = "../loginPage/login.html";
    return;
  }

  const newEmail = prompt("Enter new email:");

  if (newEmail === null) {
    return;
  }

  const trimmedEmail = newEmail.trim();

  if (trimmedEmail === "") {
    alert("Email cannot be empty.");
    return;
  }

  if (!isValidEmail(trimmedEmail)) {
    alert("Please enter a valid email address.");
    return;
  }

  const registeredUsers = getRegisteredUsers();

  const emailAlreadyExists = registeredUsers.some(function (user) {
    return (
      user.email.toLowerCase() === trimmedEmail.toLowerCase() &&
      user.email.toLowerCase() !== currentUser.email.toLowerCase()
    );
  });

  if (emailAlreadyExists) {
    alert("This email is already used by another account.");
    return;
  }

  const userIndex = registeredUsers.findIndex(function (user) {
    return user.email.toLowerCase() === currentUser.email.toLowerCase();
  });

  if (userIndex === -1) {
    alert("Current user not found.");
    return;
  }

  const oldEmail = registeredUsers[userIndex].email;

  registeredUsers[userIndex].email = trimmedEmail;
  saveRegisteredUsers(registeredUsers);

  const updatedCurrentUser = {
    ...currentUser,
    email: trimmedEmail
  };

  setCurrentUser(updatedCurrentUser);

  moveUserMoviesToNewEmail(oldEmail, trimmedEmail);
  displayProfileData();
}

resetEmailBtn.addEventListener("click", resetEmail);

document.addEventListener("DOMContentLoaded", function () {
  protectPage("../loginPage/login.html");
  displayProfileData();
});