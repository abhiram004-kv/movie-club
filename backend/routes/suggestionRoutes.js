
const express = require('express')
const router = express.Router()
const Suggestion = require('../models/Suggestion')
const Movie = require('../models/Movie')

router.post('/add', async (req, res) => {
  try {
    const suggestion = new Suggestion(req.body)
    await suggestion.save()

    res.json({ message: 'Suggestion submitted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Could not submit suggestion' })
  }
})


router.get('/pending', async (req, res) => {
  try {
    const suggestions = await Suggestion.find({ status: 'Pending' })
    res.json(suggestions)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})


router.put('/approve/:id', async (req, res) => {
  try {
    const suggestion = await Suggestion.findById(req.params.id)

    if (!suggestion) {
      return res.status(404).json({ message: 'Suggestion not found' })
    }

    if (suggestion.status !== 'Pending') {
      return res.status(400).json({ message: 'Already reviewed' })
    }

    const movie = new Movie({
      name: suggestion.name,
      image: suggestion.image,
      rating: suggestion.rating,
      year: suggestion.year,
      genre: suggestion.genre,
      language: suggestion.language,
      story: suggestion.story
    })

    await movie.save()

    suggestion.status = 'Approved'
    await suggestion.save()

    res.json({ message: 'Movie approved successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Could not approve suggestion' })
  }
})

router.put('/reject/:id', async (req, res) => {
  try {
    const suggestion = await Suggestion.findByIdAndUpdate(
      req.params.id,
      { status: 'Rejected' },
      { new: true }
    )

    if (!suggestion) {
      return res.status(404).json({ message: 'Suggestion not found' })
    }

    res.json({ message: 'Suggestion rejected' })
  } catch (err) {
    res.status(500).json({ message: 'Could not reject suggestion' })
  }
})

module.exports = router
