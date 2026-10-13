
const express = require('express')
const router = express.Router()
const Movie = require('../models/Movie')

// Get all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find()
    res.json(movies)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Add movie
router.post('/add', async (req, res) => {
  try {
    const movie = new Movie(req.body)
    await movie.save()
    res.json({ message: 'Movie added successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Could not add movie' })
  }
})

// Edit movie
router.put('/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!movie) {
      return res.status(404).json({
        message: 'Movie not found'
      })
    }

    res.json({
      message: 'Movie updated successfully',
      movie
    })
  } catch (err) {
    res.status(500).json({
      message: 'Could not update movie'
    })
  }
})

// Delete movie
router.delete('/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id)

    if (!movie) {
      return res.status(404).json({
        message: 'Movie not found'
      })
    }

    res.json({
      message: 'Movie deleted successfully'
    })
  } catch (err) {
    res.status(500).json({
      message: 'Could not delete movie'
    })
  }
})

module.exports = router
