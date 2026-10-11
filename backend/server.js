
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/MovieClub')
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err))

const userRoutes = require('./routes/userRoutes')
app.use('/user', userRoutes)

app.get('/', (req, res) => {
  res.send('Movie Club Backend Running')
})

app.listen(5000, () => {
  console.log('Server running on port 5000')
})
