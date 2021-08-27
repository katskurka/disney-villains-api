/* eslint-disable no-console */
const express = require('express')
const bodyParser = require('body-parser')
// const villains = require('./villains')
// const { response } = require('express')
const { getAllVillains, getVillainsBySlug, createNewVillain } = require('./controllers/villains')

const app = express()

app.use(bodyParser.json())

app.get('/villains', getAllVillains)

app.get('/villains/:slug', getVillainsBySlug)

app.post('/', bodyParser.json(), createNewVillain)

app.all('*', (request, response) => {
  return response.status(404).send('Off with your head!')
})

app.listen(3002, () => {
  console.log('We are live')
})
