
const express = require('express')
const router = express.Router()
const User = require('../models/User')


router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({
        message: 'Email already registered'
      })
    }

    const user = new User({
      name,
      email,
      password
    })

    await user.save()

    res.json({ message: 'Registration successful' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email, password })

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password'
      })
    }

    res.json({ message: 'Login successful' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
