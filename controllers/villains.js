const models = require('../models')

const getAllVillains = async (request, response) => {
  const villains = await models.villains.findAll()

  return response.send(villains)
}

const getVillainsBySlug = async (request, response) => {
  const { slug } = request.params

  const getVillain = await models.villains.findOne({ where: { slug } })

  if (!getVillain) return response.status(404).send('only heroes remain')

  return response.send(getVillain)
}

const createNewVillain = async (request, response) => {
  const { name, movie, slug } = request.body

  if (!name || !movie || !slug) {
    return response.status(400).send('Fools! Enter all required fields!')
  }

  const newVillain = await models.villains.create({
    name, movie, slug
  })

  return response.status(201).send(newVillain, 'createdAt', 'updatedAt')
}

module.exports = { getAllVillains, getVillainsBySlug, createNewVillain }
