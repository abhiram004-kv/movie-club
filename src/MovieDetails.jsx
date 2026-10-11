
import './MovieDetails.css'

function MovieDetails({ movie, onBack }) {
  return (
    <div className="container py-5">
      <button
        className="btn btn-danger mb-4"
        onClick={onBack}
      >
        ← Back to Movies
      </button>

      <div className="card details-card">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={movie.image}
              className="details-poster"
              alt={movie.name}
            />
          </div>

          <div className="col-md-8">
            <div className="card-body p-4">
              <h1 className="card-title">{movie.name}</h1>

              <p>Release Year: {movie.year}</p>
              <p>⭐ Rating: {movie.rating} / 10</p>
              <p>Genre: {movie.genre}</p>
              <p>Language: {movie.language}</p>

              <h4>Story</h4>
              <p>{movie.story}</p>

              <button
                className="btn btn-primary"
                onClick={onBack}
              >
                Back to Movies
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails
