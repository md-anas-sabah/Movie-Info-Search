import "./App.css";
import { useState, useEffect } from "react";

function App() {
  let [movieInfo, setMovieInfo] = useState(null);
  let [title, setTitle] = useState("the avengers");

  useEffect(() => {
    getMovieData();
  }, []);

  function readTitle(value) {
    // console.log(value);
    setTitle(value);
  }

  function getMovieData() {
    let url = `https://omdbapi.com/?t=${title}&apikey=e6efa808`;
    fetch(url)
      .then((response) => response.json())
      .then((movie) => {
        console.log(movie);
        setMovieInfo(movie);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  return (
    <div className="App">
      <div className="container">
        <div className="padd">
          <h1 className="heading">Movie Search</h1>
          <div className="field-btn">
            <input
              type="text"
              onChange={(event) => {
                readTitle(event.target.value);
              }}
              placeholder="Enter movie name.."
              className="search-field"
            />
            <button className="btn" onClick={getMovieData}>
              Search
            </button>
          </div>
        </div>
        {movieInfo?.Error === undefined ? (
          <div className="movie">
            <div className="poster">
              <img src={movieInfo?.Poster} alt="img" className="poster-img" />
            </div>
            <div className="details">
              <div className="padd">
                <h1>{movieInfo?.Title}</h1>
                <p>
                  <strong>Genre: </strong>
                  {movieInfo?.Genre}
                </p>
                <p>
                  <strong>Description: </strong>
                  {movieInfo?.Plot}
                </p>
                <p>
                  <strong>Actors: </strong>
                  {movieInfo?.Actors}
                </p>
                <p>
                  <strong>Director: </strong>
                  {movieInfo?.Director}
                </p>
                <p>
                  <strong>BoxOffice: </strong>
                  {movieInfo?.BoxOffice}
                </p>
                <p>
                  <strong>Languages: </strong>
                  {movieInfo?.Language}
                </p>
                <p>
                  <strong>Release Date: </strong>
                  {movieInfo?.Released}
                </p>
                <p>
                  <strong>Runtime: </strong>
                  {movieInfo?.Runtime}
                </p>

                <div className="ratings">
                  {movieInfo?.Ratings.map((rating, index) => (
                    <div key={index}>
                      <strong>{rating.Source}</strong>
                      <h3>{rating.Value}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h1>Movie not found!!</h1>
        )}
      </div>
    </div>
  );
}

export default App;
