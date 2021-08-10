const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000
require('dotenv').config()

const queryModel = require('./models').Brewery

app.use(cors())

app.listen(process.env.PORT || port, () => {
  console.log(`Server is listening`)
})

app.get('/breweries/all', async function (req, res) {
  const result = await queryModel.findAll()
  res.json(result)
})

