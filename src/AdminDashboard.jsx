
import { useState } from 'react'
import API_URL from './api.jsx'


function AdminDashboard() {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [rating, setRating] = useState('')
  const [year, setYear] = useState('')
  const [genre, setGenre] = useState('')
  const [language, setLanguage] = useState('')
  const [story, setStory] = useState('')

 
async function addMovie(e) {
  e.preventDefault()

  const movie = {
    name, image, rating, year, genre, language, story
  }

  try {
    const response = await fetch(`${API_URL}/movies/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movie)
    })

    const result = await response.json()

    if (!response.ok) {
      alert('Error: ' + (result.message || response.status))
      return
    }

    alert('Movie added successfully!')

    setName('')
    setImage('')
    setRating('')
    setYear('')
    setGenre('')
    setLanguage('')
    setStory('')

  } catch (error) {
    console.error('Add movie error:', error)
    alert('Connection error. Check browser Console (F12).')
  }
}

  return (
    <div className="container py-5">
      <h2>Admin Dashboard</h2>
      <p>Add a new movie to Movie Club.</p>

      <form onSubmit={addMovie}>
        <input className="form-control mb-3"
          placeholder="Movie name" value={name}
          onChange={e => setName(e.target.value)} required />

        <input className="form-control mb-3"
          placeholder="Image URL" value={image}
          onChange={e => setImage(e.target.value)} required />

        <input className="form-control mb-3"
          placeholder="Rating" value={rating}
          onChange={e => setRating(e.target.value)} required />

        <input className="form-control mb-3"
          placeholder="Year" value={year}
          onChange={e => setYear(e.target.value)} required />

        <input className="form-control mb-3"
          placeholder="Genre" value={genre}
          onChange={e => setGenre(e.target.value)} required />

        <select className="form-select mb-3"
          value={language}
          onChange={e => setLanguage(e.target.value)} required>
          <option value="">Select language</option>
          <option>English</option>
          <option>Malayalam</option>
          <option>Tamil</option>
        </select>

        <textarea className="form-control mb-3"
          placeholder="Movie story" value={story}
          onChange={e => setStory(e.target.value)} required />

        <button className="btn btn-primary" type="submit">
          Add Movie
        </button>
      </form>
    </div>
  )
}

export default AdminDashboard
