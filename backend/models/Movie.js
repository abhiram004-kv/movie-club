
const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  name: String,
  image: String,
  rating: String,
  year: String,
  genre: String,
  language: String,
  story: String
})

module.exports = mongoose.model('Movie', movieSchema)
