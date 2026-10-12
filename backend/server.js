require('dotenv').config();

const dns = require('dns');
dns.setServers(['8.8.8.8']);

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI)
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
