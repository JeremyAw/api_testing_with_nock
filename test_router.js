const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Hello, welcome to API testing with nock.')
})

router.post('/users', (req, res) => {
  const { firstName, lastName } = req.body

  // Do something 
  // Insert into database

  const response = {
    firstName: firstName,
    lastName: lastName
  }

  return res.status(201).send(response)
})

module.exports = router