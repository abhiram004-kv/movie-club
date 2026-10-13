
import { useState } from 'react'
import API_URL from './api.jsx'

function SuggestMovie() {
  const [form, setForm] = useState({
    name: '',
    image: '',
    rating: '',
    year: '',
    genre: '',
    language: '',
    story: '',
    reason: ''
  })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function submitSuggestion(e) {
    e.preventDefault()

    try {
      const response = await fetch(`${API_URL}/suggestions/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      const result = await response.json()

      if (!response.ok) {
        alert(result.message || 'Submission failed')
        return
      }

      alert('Suggestion submitted! Waiting for admin approval.')

      setForm({
        name: '',
        image: '',
        rating: '',
        year: '',
        genre: '',
        language: '',
        story: '',
        reason: ''
      })
    } catch (error) {
      alert('Connection error')
    }
  }

  return (
    <div className="container py-5">
      <h2>Suggest a Movie</h2>
      <p>Recommend a movie for Movie Club.</p>

      <form onSubmit={submitSuggestion}>
        <input className="form-control mb-3"
          name="name" placeholder="Movie name"
          value={form.name} onChange={handleChange} required />

        <input className="form-control mb-3"
          name="image" placeholder="Image URL"
          value={form.image} onChange={handleChange} required />

        <input className="form-control mb-3"
          name="rating" placeholder="Rating"
          value={form.rating} onChange={handleChange} />

        <input className="form-control mb-3"
          name="year" placeholder="Year"
          value={form.year} onChange={handleChange} />

        <input className="form-control mb-3"
          name="genre" placeholder="Genre"
          value={form.genre} onChange={handleChange} />

        <select className="form-select mb-3"
          name="language" value={form.language}
          onChange={handleChange} required>
          <option value="">Select language</option>
          <option>Malayalam</option>
          <option>Tamil</option>
          <option>English</option>
          <option>Other</option>
        </select>

        <textarea className="form-control mb-3"
          name="story" placeholder="Movie story"
          value={form.story} onChange={handleChange} />

        <textarea className="form-control mb-3"
          name="reason" placeholder="Why do you recommend this movie?"
          value={form.reason} onChange={handleChange} />

        <button className="btn btn-primary" type="submit">
          Submit Suggestion
        </button>
      </form>
    </div>
  )
}

export default SuggestMovie
