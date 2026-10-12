
const express = require('express')
const router = express.Router()
const Movie = require('../models/Movie')


router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find()
    res.json(movies)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})


router.post('/add', async (req, res) => {
  try {
    const movie = new Movie(req.body)
    await movie.save()
    res.json({ message: 'Movie added successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Could not add movie' })
  }
})

module.exports = router
