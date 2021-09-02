// eslint-disable-next-line max-len
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const { /* before, beforeEach, after, afterEach,*/describe, it } = require('mocha')
const { getAllVillains, getVillainsBySlug, createNewVillain } = require('../../controllers/villains')
const { villainsList, oneVillain } = require('../mocks/villains.test')

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - villains', () => {
  describe('getAllVillains', () => {
    it('retrieves a list of all villains from the db and calls response.send() with the list', async () => {
      const stubbedFindAll = sinon.stub(models.villains, 'findAll').returns(villainsList)
      const stubbedSend = sinon.stub()
      const response = { send: stubbedSend }

      await getAllVillains({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(villainsList)
    })
  })

  describe('getVillainsBySlug', () => {
    it('retrieves a villain associated with provided slug from db and calls response.send with it', async () => {
      const request = { params: { slug: 'maleficent' } }
      const stubbedSend = sinon.stub()
      const response = { send: stubbedSend }
      const stubbedFindOne = sinon.stub(models.villains, 'findOne').returns(oneVillain)

      await getVillainsBySlug(request, response)
    })
  })

  describe('createNewVillain', () => {
    it('acceps new villain info and saves them to the db, returning the saved record with a 201 status', async () => {
      const request = { body: oneVillain }
      const stubbedSend = sinon.stub()
      const stubbedStatus = sinon.stub().returns({ send: stubbedSend })
      const response = { status: stubbedStatus }
      const stubbedCreate = sinon.stub(models.villains, 'create').returns(oneVillain)

      await createNewVillain(request, response)

      expect(stubbedCreate).to.have.been.calledWith(oneVillain)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedSend).to.have.been.calledWith(oneVillain)
    })
  })
})
