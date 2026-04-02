const MIN_RENT_HOURS = 12;
const MAX_RENT_HOURS = 168;
const RENT_STEP = 12;

function calculateMoviePrice(basePrice, hours) {
  return (basePrice * (hours / 12)).toFixed(2);
}

function renderYourMovies() {
  const yourMoviesList = document.getElementById("yourMoviesList");
  const yourMovies = getYourMovies();

  yourMoviesList.innerHTML = "";

  if (yourMovies.length === 0) {
    yourMoviesList.innerHTML = `<p class="empty-message">No rented movies yet.</p>`;
    return;
  }

  yourMovies.forEach(function (movie, index) {
    const row = document.createElement("div");
    row.classList.add("your-movie-row");

    row.innerHTML = `
      <div>${movie.name}</div>
      <div>${movie.genre}</div>

      <div class="small-time-controls">
        <button class="arrow-btn decrease-btn" type="button" data-index="${index}">&lt;</button>
        <span class="time-box">${movie.time}h</span>
        <button class="arrow-btn increase-btn" type="button" data-index="${index}">&gt;</button>
      </div>

      <div>${calculateMoviePrice(movie.rentalPrice, movie.time)}$</div>

      <button class="remove-btn" type="button" data-index="${index}">Remove</button>
    `;

    yourMoviesList.appendChild(row);
  });

  addYourMoviesEventListeners();
}

function addYourMoviesEventListeners() {
  const decreaseButtons = document.querySelectorAll(".decrease-btn");
  const increaseButtons = document.querySelectorAll(".increase-btn");
  const removeButtons = document.querySelectorAll(".remove-btn");

  decreaseButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const index = Number(button.dataset.index);
      decreaseMovieTime(index);
    });
  });

  increaseButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const index = Number(button.dataset.index);
      increaseMovieTime(index);
    });
  });

  removeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const index = Number(button.dataset.index);
      removeMovie(index);
    });
  });
}

function decreaseMovieTime(index) {
  const yourMovies = getYourMovies();

  if (!yourMovies[index]) {
    return;
  }

  if (yourMovies[index].time > MIN_RENT_HOURS) {
    yourMovies[index].time -= RENT_STEP;
    saveYourMovies(yourMovies);
    renderYourMovies();
  }
}

function increaseMovieTime(index) {
  const yourMovies = getYourMovies();

  if (!yourMovies[index]) {
    return;
  }

  if (yourMovies[index].time < MAX_RENT_HOURS) {
    yourMovies[index].time += RENT_STEP;
    saveYourMovies(yourMovies);
    renderYourMovies();
  }
}

function removeMovie(index) {
  const yourMovies = getYourMovies();
  const movies = getMovies();

  if (!yourMovies[index]) {
    return;
  }

  const removedMovie = yourMovies[index];

  yourMovies.splice(index, 1);

  const movieInStock = movies.find(function (movie) {
    return movie.id === removedMovie.id;
  });

  if (movieInStock) {
    movieInStock.countInStock += 1;
  }

  saveYourMovies(yourMovies);
  saveMovies(movies);

  renderYourMovies();
}

document.addEventListener("DOMContentLoaded", function () {
  protectPage("../loginPage/login.html");
  renderYourMovies();
});