const apiKey = "15912c23";
window.onload = function() {
    input = document.getElementById("search");
    input.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            searchMovie();
        }
    });

    let lastMovie = localStorage.getItem("lastMovie");
    if(lastMovie){
        document.getElementById("search").value = lastMovie;
        searchMovie();
    }
};

async function searchMovie() {
    let movieName = document.getElementById("search").value;
    let result = document.getElementById("result");

    if(movieName === ""){
        result.innerHTML="<p>❗Please enter a movie name</p>";
        return;
    }

    result.innerHTML = "<p>Loading...</p>";

    try{
        let response = await fetch(`https://www.omdbapi.com/?apiKey=${apiKey}&t=${movieName}`);
        let data = await response.json();

        if(data.Response === "False"){
            result.innerHTML = `<p>Movie With the name <span style="color:red">${movieName}</span> is Not found ❌</p>`;
            return;
        }

        result.innerHTML = `<div class="movie-card"> 
            <img src="${data.Poster !== "N/A" ? data.Poster : "https://via.placeholder.com/200x300"}" alt="${data.Title}" width="200" />
            <h2>${data.Title}</h2>
            <p>${data.Year} | ${data.Rated} | ${data.Runtime}</p>
            <p>⭐ IMDB Rating: ${data.imdbRating}</p>
            <p>🎭 Genre: ${data.Genre}</p>
            <p>📃 Plot: ${data.Plot}</p>
            </div>
            `;
        document.body.style.backgroundImage = `url(${data.Poster !== "N/A" ? data.Poster : ""})`;
        document.body.style.backgroundSize = "cover";

            localStorage.setItem("lastMovie", movieName);
    }catch(error){
        result.innerHTML = `<p>❗Error fetching data. Please try again later.</p>`;
    }
    
    
}