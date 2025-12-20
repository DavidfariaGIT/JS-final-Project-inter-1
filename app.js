
const url = 'https://api.themoviedb.org/3/movie/popular?limit=5';
const animeUrl = "https://api.jikan.moe/v4/anime?limit=5";

const imageBaseUrl = 'https://image.tmdb.org/t/p/';
const imageSize = 'w200';

const movieDisplay = document.querySelector('#movie-display');
const animeDisplay = document.querySelector('#anime-display');
const mainContainer = document.querySelector('#main-container');
const searchBar = document.querySelector('#search-bar');
const searchButton = document.querySelector('#submit-button');
const searchType = document.querySelector('#media-type');

async function getMovieData() {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP Error status: ${response.status}`);

        };

        const data = await response.json()
        return data;


    } catch (error) {
        console.error("Error fetching data", error);
    }
}

getMovieData();

async function getAnimeData() {
    try {
        const response = await fetch(animeUrl);

        if (!response.ok) {
            throw new Error(`HTTP Error status: ${response.status}`);

        };

        const data = await response.json()
        return data;


    } catch (error) {
        console.error("Error fetching data", error);
    }
}

getAnimeData();


const animeDataStorage = [];

async function displayAnimeData(data) {

    if (!data) {
        const data = await getAnimeData();
        const animeList = data.data;

        animeList.forEach((anime) => {
            const animeObject = {};

            animeObject.title = anime.title;
            animeObject.desc = anime.background;
            animeObject.image = anime.images.jpg.image_url;
            animeObject.year = anime.year;
            animeObject.genre = anime.genres[0].name;
            animeObject.id = anime.mal_id;

            animeDataStorage.push(animeObject);

            const newDiv = document.createElement('div');
            newDiv.id = animeObject.id;
            newDiv.classList.add("anime-card");
            const imageEl = document.createElement('img');
            const title = document.createElement('p');
            imageEl.src = animeObject.image;
            title.textContent = animeObject.title;

            newDiv.appendChild(imageEl);
            newDiv.appendChild(title);

            animeDisplay.appendChild(newDiv);

            const animeCard = document.querySelectorAll('.anime-card');

            animeCard.forEach((div) => {
                div.addEventListener('click', () => {
                    const animeId = div.id;
                    displayAnimeInfo(animeId);
                });

            })

        })

    } else {

        const animeList = data.data;

        animeDisplay.innerHTML = "";

        animeList.forEach((anime) => {
            const animeObject = {};

            animeObject.title = anime.title;
            animeObject.desc = anime.background;
            animeObject.image = anime.images.jpg.image_url;
            animeObject.year = anime.year;
            animeObject.genre = anime.genres[0].name;
            animeObject.id = anime.mal_id;

            animeDataStorage.push(animeObject);

            const newDiv = document.createElement('div');
            newDiv.id = animeObject.id;
            newDiv.classList.add("anime-card");
            const imageEl = document.createElement('img');
            const title = document.createElement('p');
            imageEl.src = animeObject.image;
            title.textContent = animeObject.title;

            newDiv.appendChild(imageEl);
            newDiv.appendChild(title);

            animeDisplay.appendChild(newDiv);

            const animeCard = document.querySelectorAll('.anime-card');

            animeCard.forEach((div) => {
                div.addEventListener('click', () => {
                    const animeId = div.id;
                    displayAnimeInfo(animeId);
                })

            })

        })

    }
}


displayAnimeData();


const movieDataStorage = [];

async function displayMovieData(dataSliced) {

    if (!dataSliced) {

        const data = await getMovieData();
        const limitData = data.results.splice(0, 5);
        console.log(limitData);
        const movieList = limitData;

        movieList.forEach((movie) => {
            const movieImage = `${imageBaseUrl}${imageSize}${movie.backdrop_path}`;
            const movieObject = {};

            movieObject.title = movie.title;
            movieObject.image = movieImage;
            movieObject.desc = movie.overview;
            movieObject.id = movie.id;
            movieObject.release = movie.release_date;

            movieDataStorage.push(movieObject);

            const newDiv = document.createElement('div');
            newDiv.classList.add("movie-card");
            newDiv.id = movieObject.id;
            const imageEl = document.createElement('img');
            imageEl.src = movieImage;
            const title = document.createElement('p');
            title.textContent = movie.title;

            newDiv.appendChild(imageEl);
            newDiv.appendChild(title);

            movieDisplay.appendChild(newDiv);

        });
        const movieCard = document.querySelectorAll(".movie-card");

        movieCard.forEach(movie => {
            movie.addEventListener('click', () => {
                const movieId = movie.id;
                displayMovieInfo(movieId);
            });
        });
    } else {
        const movieList = dataSliced;

        movieDisplay.innerHTML = "";

        movieList.forEach((movie) => {
            const movieImage = `${imageBaseUrl}${imageSize}${movie.backdrop_path}`;
            const movieObject = {};

            movieObject.title = movie.title;
            movieObject.image = movieImage;
            movieObject.desc = movie.overview;
            movieObject.id = movie.id;
            movieObject.release = movie.release_date;

            movieDataStorage.push(movieObject);

            const newDiv = document.createElement('div');
            newDiv.classList.add("movie-card");
            newDiv.id = movieObject.id;
            const imageEl = document.createElement('img');
            imageEl.src = movieImage;
            const title = document.createElement('p');
            title.textContent = movie.title;

            newDiv.appendChild(imageEl);
            newDiv.appendChild(title);

            movieDisplay.appendChild(newDiv);

        });
        const movieCard = document.querySelectorAll(".movie-card");

        movieCard.forEach(movie => {
            movie.addEventListener('click', () => {
                const movieId = movie.id;
                displayMovieInfo(movieId);
            });
        });

    }
};

displayMovieData();

function displayMovieInfo(movieId) {
    const popUpExist = document.querySelector('.card-display');

    const movieObject = movieDataStorage.find((movie) => movie.id === Number((movieId)));

    if (!popUpExist) {
        const popUp = document.createElement("div");
        popUp.classList.add("card-display");

        const popUpContainer = document.createElement("section");
        popUpContainer.classList.add("popup-container");

        popUpContainer.innerHTML = `
    <div id="popup-image-container">
    <h1 id="popup-title">${movieObject.title}</h1>
    <img id="popup-image" src="${movieObject.image}">
    </div>
    <div id="popup-text-container">
    <p id="popup-desc">${movieObject.desc || "No description available"}</p>
    <p id="pop-year">Release date: ${movieObject.release || "No year available"}</p>
    <section id="buttons-container">
    <a href="review.html"><button id="popup-review-button">Review</button></a>
    <button id="popup-close-button">Close</button>
    </section>
    </div>
    `

        popUp.appendChild(popUpContainer);
        mainContainer.appendChild(popUp);


        const popUpCloseButton = document.getElementById('popup-close-button');
        popUpCloseButton.addEventListener('click', () => {
            popUp.style.display = "none";
        })
    } else {

        const movieTitle = document.getElementById('popup-title');
        const movieImg = document.getElementById('popup-image');
        const movieDesc = document.getElementById('popup-desc');
        const movieYear = document.getElementById('pop-year');
        const newPopUp = document.querySelector('.card-display');

        movieTitle.textContent = movieObject.title;
        movieImg.src = movieObject.image;
        movieDesc.textContent = movieObject.desc;
        movieYear.textContent = `Year: ${movieObject.release || "no year available"}`;

        newPopUp.style.display = "";
    }
};


console.log(movieDataStorage);




async function displayAnimeInfo(animeId) {

    const popUpExist = document.querySelector('.card-display');

    const animeObject = animeDataStorage.find((anime) => anime.id === Number((animeId)));

    if (!popUpExist) {
        const popUp = document.createElement("div");
        popUp.classList.add("card-display");

        const popUpContainer = document.createElement("section");
        popUpContainer.classList.add("popup-container");

        popUpContainer.innerHTML = `
    <div id="popup-image-container">
    <h1 id="popup-title">${animeObject.title}</h1>
    <img id="popup-image" src="${animeObject.image}">
    </div>
    <div id="popup-text-container">
    <p id="popup-desc">${animeObject.desc || "No description available"}</p>
    <p id="pop-year">Year: ${animeObject.release || "No year available"}</p>
    <section id="genre-container">
    <p id="genre-label">Genre:</p>
    <p id="pop-genre">${animeObject.genre || "No Genre available"}</p>
    </section>
    <section id="buttons-container">
    <a href="review.html"><button id="popup-review-button">Review</button></a>
    <button id="popup-close-button">Close</button>
    </section>
    </div>
    `

        popUp.appendChild(popUpContainer);
        mainContainer.appendChild(popUp);


        const popUpCloseButton = document.getElementById('popup-close-button');
        popUpCloseButton.addEventListener('click', () => {
            popUp.style.display = "none";
        });

    } else {

        const animeTitle = document.getElementById('popup-title');
        const animeImg = document.getElementById('popup-image');
        const animeDesc = document.getElementById('popup-desc');
        const animeYear = document.getElementById('pop-year');
        const animeGenre = document.getElementById('pop-genre')
        const newPopUp = document.querySelector('.card-display');

        animeTitle.textContent = animeObject.title;
        animeImg.src = animeObject.image;
        animeDesc.textContent = animeObject.desc || "no description available";
        animeYear.textContent = `Year: ${animeObject.release || "no year available"}`;
        animeGenre.textContent = animeObject.genre;


        newPopUp.style.display = "";
    }
};

function getSearchMedia() {
    searchButton.addEventListener('click', () => {
        const userInput = searchBar.value;


        if (searchType.value === "Anime") {
            const params = new URLSearchParams();
            params.append('q', userInput);
            params.append('limit', '5');

            async function userAnimeSearch() {
                try {
                    const animeUrlSearch = `https://api.jikan.moe/v4/anime?${params.toString()}`;

                    const response = await fetch(animeUrlSearch);

                    if (!response.ok) {
                        throw new Error(` HTTP response error ${response.status}`)
                    }

                    const data = await response.json();
                    console.log(data);
                    return displayAnimeData(data);

                } catch (error) {
                    console.error("there was a fetch error", error);
                }
            }
            userAnimeSearch();
        } else {

            async function userMovieSearch() {
                const params = new URLSearchParams();
                params.append('query', userInput);

                try {

                    const movieUrlSearch = `https://api.themoviedb.org/3/search/movie?${params.toString()}`;

                    const response = await fetch(movieUrlSearch, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    if (!response.ok) {
                        throw new Error(` HTTP response error ${response.status}`)
                    }

                    const data = await response.json();
                    const dataSliced = data.results.slice(0, 5);
                    return displayMovieData(dataSliced);

                } catch (error) {
                    console.error("there was a fetch error", error);
                }
            }
            userMovieSearch();
        }
    });
};

getSearchMedia();