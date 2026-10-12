
require('dotenv').config()

const dns = require('dns')
dns.setServers(['8.8.8.8', '1.1.1.1'])

const mongoose = require('mongoose')
const User = require('./models/User')

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)

    const email = process.env.ADMIN_EMAIL
    const password = process.env.ADMIN_PASSWORD

    const existingUser = await User.findOne({ email })

    if (existingUser) {
    existingUser.role = 'admin'
    existingUser.password = password
    await existingUser.save()
    console.log('Admin password updated')
    } else {
      await User.create({
        name: 'Admin',
        email,
        password,
        role: 'admin'
      })
      console.log('Admin account created')
    }
  } catch (error) {
    console.log('Error:', error.message)
  } finally {
    await mongoose.disconnect()
  }
}

createAdmin()
