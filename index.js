/* eslint-disable no-console */
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const villains = require('./villains')

app.use(bodyParser.json())

app.get('/villains', (req, res) => {
  const getVillain = villains.filter(villain => villain.name)

  return res.send(getVillain)
})

app.listen(3002, () => {
  console.log('We are live')
})
