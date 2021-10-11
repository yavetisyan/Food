const apiKey = "f3e44518-c40b-4eb2-a722-f47940fb3ade";
const apiURL =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=";

const keySearch = "https://kinopoiskapiunofficial.tech/api/v2.2/films/";

const infoApi = "https://kinopoiskapiunofficial.tech/api/v2.2/films/";

const form = document.querySelector("form");
const search = document.querySelector(".header__search");
let btn = document.getElementsByClassName("modal__btn");
let modal = document.querySelector(".modal");
const MODAL_CLASS_NAME = "modal";

function getMovies(url) {
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": apiKey,
    },
  })
    .then((res) => res.json())
    .then((data) => showMovies(data));
}

getMovies(apiURL);

function showMovies(data) {
  const movies = document.querySelector(".movies");

  movies.innerHTML = "";

  data.films.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
				<div class="movie__cover">
					<img class="movie__img"	src="${movie.posterUrlPreview}"	alt="${movie.nameRu}"/>
					<div class="movie__darkened"></div>
				</div>
				<div class="movie__info">
					<div class="movie__title">${movie.nameRu}</div>
					<div class="movie__category">${movie.genres.map(
            (genre) => ` ${genre.genre}`
          )}</div>
					<div class="movie__average movie__average-${getRating(movie.rating)}">${
      movie.rating
    }</div>
	 			</div>`;

    movies.append(movieEl);

    movieEl.onclick = function () {
      urlDescr(movie, movies);
    };
  });
}

function getRating(rate) {
  if (rate >= 7) {
    return "green";
  } else if (rate > 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchApi = `${keySearch}${search.value}`;

  if (search.value) {
    getMovies(searchApi);

    search.value = "";
  }
});

function removeOpenedModals() {
  const modals = document.getElementsByClassName(MODAL_CLASS_NAME);
  [...modals].forEach((el) => el.remove());
}

function urlDescr(movieUrl, movies) {
  let movieApi = infoApi + movieUrl.filmId;
  console.log(movieApi);
  fetch(movieApi, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": apiKey,
    },
  })
    .then((res) => res.json())
    .then((filmsData) => {
      removeOpenedModals();
      const modalEl = document.createElement("div");

      modalEl.classList.add(MODAL_CLASS_NAME);
      modalEl.innerHTML = `     
				<div class="modal__title">
					<button class="modal__btn">x</button>
					<div class="modal__info">${filmsData.nameRu}</div>
					<div class="modal__descr">${filmsData.description}</div>
								<div class="info">
						<div class="info__title">
							<a href="${filmsData.webUrl}" target='_blank'>Link</a>
							<span class="year">Год: ${filmsData.year} г.</span>
							<span class="film__length">Продолжительность: ${filmsData.filmLength} мин. </span>
						</div>
					</div>
			</div>`;

      movies.before(modalEl);
      document
        .querySelector(".modal__btn")
        .addEventListener("click", function () {
          modalEl.remove();
        });
    });
}
