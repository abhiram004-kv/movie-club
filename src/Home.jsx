
import { useState, useEffect } from 'react'
import API_URL from './api.jsx'
import './Home.css'

function Home({ onMovieClick }) {
  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('All')

  useEffect(() => {
    fetch(`${API_URL}/movies`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load movies')
        }
        return response.json()
      })
      .then(data => setMovies(data))
      .catch(error => console.log(error))
  }, [])

  const filteredMovies = movies.filter((movie) => {
    const matchSearch = movie.name
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchLanguage =
      selectedLanguage === 'All' ||
      movie.language === selectedLanguage

    return matchSearch && matchLanguage
  })

  return (
    <div className="container py-5">
      <div className="home-hero mb-5">
        <h1>Discover Your Next Favourite Movie</h1>
        <p>Explore movies, stories and unforgettable characters.</p>
      </div>

      <input
        type="text"
        className="form-control mb-4 search-box"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="mb-4">
        {['All', 'English', 'Malayalam', 'Tamil'].map((language) => (
          <button
            key={language}
            className={
              selectedLanguage === language
                ? 'btn btn-primary me-2 mb-2'
                : 'btn btn-danger me-2 mb-2'
            }
            onClick={() => setSelectedLanguage(language)}
          >
            {language}
          </button>
        ))}
      </div>

      <h2 className="section-title mb-4">Movies</h2>

      <div className="row g-4">
        {filteredMovies.map((movie) => (
          <div className="col-6 col-md-4 col-lg-3" key={movie._id || movie.name}>
            <div
              className="card movie-card h-100"
              onClick={() => onMovieClick(movie)}
            >
              <img
                src={movie.image}
                className="card-img-top"
                alt={movie.name}
              />

              <div className="card-body">
                <h5 className="card-title">{movie.name}</h5>
                <p className="card-text">⭐ {movie.rating} / 10</p>
                <p className="card-text">Genre: {movie.genre}</p>
                <p className="card-text">Language: {movie.language}</p>

                <button
                  className="btn btn-primary w-100"
                  onClick={(e) => {
                    e.stopPropagation()
                    onMovieClick(movie)
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMovies.length === 0 && (
        <p className="text-light">No movies found.</p>
      )}
    </div>
  )
}

export default Home
