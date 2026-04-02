const defaultMovies = [
  { id: 1, name: "Batman", genre: "Action", rentalPrice: 4.55, countInStock: 3 },
  { id: 2, name: "Interstellar", genre: "Sci-Fi", rentalPrice: 5.20, countInStock: 2 },
  { id: 3, name: "Titanic", genre: "Romance", rentalPrice: 3.80, countInStock: 1 },
  { id: 4, name: "The Matrix", genre: "Sci-Fi", rentalPrice: 4.90, countInStock: 4 },
  { id: 5, name: "Joker", genre: "Drama", rentalPrice: 4.40, countInStock: 0 },
  { id: 6, name: "Avatar", genre: "Fantasy", rentalPrice: 5.00, countInStock: 2 },
  { id: 7, name: "Inception", genre: "Thriller", rentalPrice: 5.35, countInStock: 1 },
  { id: 8, name: "Gladiator", genre: "Historical", rentalPrice: 4.10, countInStock: 0 }
];

function initializeMovies() {
  const savedMovies = localStorage.getItem(MOVIES_STORAGE_KEY);

  if (!savedMovies) {
    saveMovies(defaultMovies);
  }
}

function getStockIconPath(countInStock) {
  if (countInStock > 0) {
    return "../assets/images/Check.png";
  }

  return "../assets/images/Cross.png";
}

function renderMovies() {
  const moviesList = document.getElementById("moviesList");
  const movies = getMovies();

  moviesList.innerHTML = "";

  movies.forEach(function (movie) {
    const row = document.createElement("div");
    row.classList.add("movie-row");

    const isInStock = movie.countInStock > 0;

    row.innerHTML = `
      <div>${movie.name}</div>
      <div>${movie.genre}</div>
      <div>${movie.rentalPrice.toFixed(2)}$</div>
      <div class="stock-cell">
        <img
          class="stock-icon"
          src="${getStockIconPath(movie.countInStock)}"
          alt="${isInStock ? "In stock" : "Not in stock"}"
        />
      </div>
      <button 
        class="rent-btn ${!isInStock ? "disabled-btn" : ""}" 
        data-id="${movie.id}"
        ${!isInStock ? "disabled" : ""}
        type="button"
      >
        Rent
      </button>
    `;

    moviesList.appendChild(row);
  });

  addRentButtonEvents();
}

function addRentButtonEvents() {
  const rentButtons = document.querySelectorAll(".rent-btn");

  rentButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const movieId = Number(button.dataset.id);
      rentMovie(movieId);
    });
  });
}

function rentMovie(movieId) {
  const movies = getMovies();
  const yourMovies = getYourMovies();

  const movieIndex = movies.findIndex(function (movie) {
    return movie.id === movieId;
  });

  if (movieIndex === -1) {
    return;
  }

  const selectedMovie = movies[movieIndex];

  if (selectedMovie.countInStock === 0) {
    return;
  }

  const rentedMovie = {
    id: selectedMovie.id,
    name: selectedMovie.name,
    genre: selectedMovie.genre,
    rentalPrice: selectedMovie.rentalPrice,
    time: 12
  };

  yourMovies.push(rentedMovie);
  selectedMovie.countInStock -= 1;

  saveYourMovies(yourMovies);
  saveMovies(movies);

  renderMovies();
}

function setupLogout() {
  const logoutBtn = document.getElementById("logoutBtn");

  if (!logoutBtn) {
    return;
  }

  logoutBtn.addEventListener("click", function () {
    clearCurrentUser();
    window.location.href = "../loginPage/login.html";
  });
}

document.addEventListener("DOMContentLoaded", function () {
  protectPage("../loginPage/login.html");
  initializeMovies();
  setupLogout();
  renderMovies();
});