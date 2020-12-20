const express = require('express')
const test_router = require('./test_router.js')

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', test_router)

app.listen(port, () => {
  console.log(`Test server is listening at http://localhost:${port}`)
})