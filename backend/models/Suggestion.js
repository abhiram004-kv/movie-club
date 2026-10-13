
const mongoose = require('mongoose')

const suggestionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  rating: String,
  year: String,
  genre: String,
  language: {
    type: String,
    required: true
  },
  story: String,
  reason: String,
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Approved', 'Rejected']
  }
})

module.exports = mongoose.model('Suggestion', suggestionSchema)
