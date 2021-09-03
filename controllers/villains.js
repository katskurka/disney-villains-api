const models = require('../models')

const getAllVillains = async (request, response) => {
  const villains = await models.villains.findAll()

  return response.send(villains)
}

const getVillainsBySlug = async (request, response) => {
  try {
    const { slug } = request.params

    const getVillain = await models.villains.findOne({ where: { slug } })

    return getVillain
      ? response.send(getVillain)
      : response.sendStatus(404).send('only heroes remain')
  } catch (error) {
    return response.status(500).send('Unable to find villain, try again later')
  }
}

const createNewVillain = async (request, response) => {
  const { name, movie, slug } = request.body

  if (!name || !movie || !slug) {
    return response.status(400).send('Fools! Enter all required fields!')
  }

  const newVillain = await models.villains.create({
    name, movie, slug
  })

  return response.status(201).send(newVillain)
}

module.exports = { getAllVillains, getVillainsBySlug, createNewVillain }
