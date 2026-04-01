const userProfile = {
  name: "John",
  surname: "Newman",
  email: "john.newman@mail.com"
};

const profileName = document.getElementById("profileName");
const profileSurname = document.getElementById("profileSurname");
const profileEmail = document.getElementById("profileEmail");
const resetEmailBtn = document.getElementById("resetEmailBtn");

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function displayProfileData() {
  profileName.textContent = userProfile.name;
  profileSurname.textContent = userProfile.surname;
  profileEmail.textContent = userProfile.email;
}

function resetEmail() {
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

  userProfile.email = trimmedEmail;
  displayProfileData();
}

resetEmailBtn.addEventListener("click", resetEmail);

displayProfileData();