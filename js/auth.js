const REGISTERED_USERS_KEY = "registeredUsers";
const CURRENT_USER_KEY = "currentUser";
const MOVIES_STORAGE_KEY = "movies";

function getRegisteredUsers() {
  const users = localStorage.getItem(REGISTERED_USERS_KEY);
  return users ? JSON.parse(users) : [];
}

function saveRegisteredUsers(users) {
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
}

function getCurrentUser() {
  const currentUser = localStorage.getItem(CURRENT_USER_KEY);
  return currentUser ? JSON.parse(currentUser) : null;
}

function setCurrentUser(user) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

function clearCurrentUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

function isLoggedIn() {
  return getCurrentUser() !== null;
}

function redirectIfLoggedIn(homePath) {
  if (isLoggedIn()) {
    window.location.href = homePath;
  }
}

function protectPage(loginPath) {
  if (!isLoggedIn()) {
    window.location.href = loginPath;
  }
}

function getMovies() {
  const movies = localStorage.getItem(MOVIES_STORAGE_KEY);
  return movies ? JSON.parse(movies) : [];
}

function saveMovies(movies) {
  localStorage.setItem(MOVIES_STORAGE_KEY, JSON.stringify(movies));
}

function getUserMoviesKey() {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return null;
  }

  return `yourMovies_${currentUser.email.toLowerCase()}`;
}

function getYourMovies() {
  const key = getUserMoviesKey();

  if (!key) {
    return [];
  }

  const yourMovies = localStorage.getItem(key);
  return yourMovies ? JSON.parse(yourMovies) : [];
}

function saveYourMovies(yourMovies) {
  const key = getUserMoviesKey();

  if (!key) {
    return;
  }

  localStorage.setItem(key, JSON.stringify(yourMovies));
}