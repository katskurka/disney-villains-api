const villains = require('../villains')

const getAllVillains = (request, response) => {
  return response.send(villains)
}

const getVillainsBySlug = (request, response) => {
  const { slug } = request.params

  const getVillain = villains.filter((villain) => villain.slug === slug)

  return response.send(getVillain)
}

const createNewVillain = (request, response) => {
  const { name, movie, slug } = request.body

  if (!name || !movie || !slug) {
    return response.status(400).send('Fools! Enter all required fields!')
  }
}

module.exports = getAllVillains, getVillainsBySlug, createNewVillain
