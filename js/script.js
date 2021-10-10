const apiKey = "f3e44518-c40b-4eb2-a722-f47940fb3ade";
const apiURL =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1";

const keySearch =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

const infoApi = "https://kinopoiskapiunofficial.tech/api/v2.2/films/";

const form = document.querySelector("form");
const search = document.querySelector(".header__search");

function getMovies(url) {
  console.log(url);
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



