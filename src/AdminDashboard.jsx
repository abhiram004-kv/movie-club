
import { useState, useEffect } from 'react'
import API_URL from './api.jsx'

function AdminDashboard() {
  const emptyMovie = {
    name: '',
    image: '',
    rating: '',
    year: '',
    genre: '',
    language: '',
    story: ''
  }

  const [form, setForm] = useState(emptyMovie)
  const [movies, setMovies] = useState([])
  const [editId, setEditId] = useState(null)
  const [suggestions, setSuggestions] = useState([])

  async function loadMovies() {
    try {
      const response = await fetch(`${API_URL}/movies`)
      const data = await response.json()

      if (response.ok) {
        setMovies(data)
      }
    } catch (error) {
      console.log('Load error:', error)
    }
  }
  async function loadSuggestions() {
  try {
    const response = await fetch(`${API_URL}/suggestions/pending`)
    const data = await response.json()

    if (response.ok) {
      setSuggestions(data)
    }
  } catch (error) {
    console.log('Suggestion load error:', error)
  }
}

  useEffect(() => {
    loadMovies()
    loadSuggestions()
  }, [])

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  async function saveMovie(e) {
    e.preventDefault()

    const url = editId
      ? `${API_URL}/movies/${editId}`
      : `${API_URL}/movies/add`

    try {
      const response = await fetch(url, {
        method: editId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })

      const result = await response.json()

      if (!response.ok) {
        alert(result.message || 'Something went wrong')
        return
      }

      alert(editId ? 'Movie updated!' : 'Movie added!')

      setForm(emptyMovie)
      setEditId(null)
      loadMovies()
    } catch (error) {
      console.log(error)
      alert('Connection error')
    }
  }

  function editMovie(movie) {
    setForm({
      name: movie.name || '',
      image: movie.image || '',
      rating: movie.rating || '',
      year: movie.year || '',
      genre: movie.genre || '',
      language: movie.language || '',
      story: movie.story || ''
    })

    setEditId(movie._id)
    window.scrollTo(0, 0)
  }

  async function deleteMovie(id) {
    if (!window.confirm('Are you sure you want to delete this movie?')) {
      return
    }

    try {
      const response = await fetch(`${API_URL}/movies/${id}`, {
        method: 'DELETE'
      })

      const result = await response.json()

      if (!response.ok) {
        alert(result.message || 'Delete failed')
        return
      }

      alert('Movie deleted!')
      loadMovies()
    } catch (error) {
      console.log(error)
      alert('Connection error')
    }
  }

  function cancelEdit() {
    setForm(emptyMovie)
    setEditId(null)
  }
  async function reviewSuggestion(id, action) {
  const message = action === 'approve'
    ? 'Approve this movie suggestion?'
    : 'Reject this movie suggestion?'

  if (!window.confirm(message)) {
    return
  }

  try {
    const response = await fetch(
      `${API_URL}/suggestions/${action}/${id}`,
      { method: 'PUT' }
    )

    const result = await response.json()

    if (!response.ok) {
      alert(result.message || 'Something went wrong')
      return
    }

    alert(result.message)

    loadSuggestions()

    if (action === 'approve') {
      loadMovies()
    }
  } catch (error) {
    console.log(error)
    alert('Connection error')
  }
}

  return (
    <div className="container py-5">
      <h2>Admin Dashboard</h2>
      <p>Add, edit or remove movies from Movie Club.</p>

      <form onSubmit={saveMovie}>
        <input
          className="form-control mb-3"
          name="name"
          placeholder="Movie name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3"
          name="rating"
          placeholder="Rating"
          value={form.rating}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3"
          name="year"
          placeholder="Year"
          value={form.year}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3"
          name="genre"
          placeholder="Genre"
          value={form.genre}
          onChange={handleChange}
          required
        />

        <select
          className="form-select mb-3"
          name="language"
          value={form.language}
          onChange={handleChange}
          required
        >
          <option value="">Select language</option>
          <option>English</option>
          <option>Malayalam</option>
          <option>Tamil</option>
        </select>

        <textarea
          className="form-control mb-3"
          name="story"
          placeholder="Movie story"
          value={form.story}
          onChange={handleChange}
          required
        />

        <button className="btn btn-primary me-2" type="submit">
          {editId ? 'Update Movie' : 'Add Movie'}
        </button>

        {editId && (
          <button
            className="btn btn-secondary"
            type="button"
            onClick={cancelEdit}
          >
            Cancel
          </button>
        )}
      </form>
      
<hr className="my-5" />

<h3>User Movie Suggestions</h3>
<p>Review suggestions submitted by users.</p>

<div className="row g-4 mt-2">
  {suggestions.length === 0 ? (
    <div className="col-12">
      <p>No pending suggestions.</p>
    </div>
  ) : (
    suggestions.map(movie => (
      <div className="col-12 col-md-6 col-lg-4" key={movie._id}>
        <div className="card h-100">
          <img
            src={movie.image}
            className="card-img-top"
            alt={movie.name}
            style={{ height: '250px', objectFit: 'cover' }}
          />

          <div className="card-body">
            <h5 className="card-title">{movie.name}</h5>
            <p>Language: {movie.language}</p>
            <p>Year: {movie.year}</p>
            <p>Rating: {movie.rating}</p>
            <p>Genre: {movie.genre}</p>
            <p>Reason: {movie.reason || 'Not provided'}</p>
            <span className="badge text-bg-warning mb-3">
              Pending
            </span>

            <div>
              <button
                className="btn btn-success me-2"
                onClick={() => reviewSuggestion(movie._id, 'approve')}
              >
                Approve
              </button>

              <button
                className="btn btn-danger"
                onClick={() => reviewSuggestion(movie._id, 'reject')}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    ))
  )}
</div>

      <hr className="my-5" />

      <h3>Manage Movies</h3>

      <div className="row g-4 mt-2">
        {movies.map(movie => (
          <div className="col-12 col-md-6 col-lg-4" key={movie._id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{movie.name}</h5>
                <p>Language: {movie.language}</p>
                <p>Rating: {movie.rating}</p>

                <button
                  className="btn btn-warning me-2"
                  onClick={() => editMovie(movie)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => deleteMovie(movie._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard
