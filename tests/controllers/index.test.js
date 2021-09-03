// eslint-disable-next-line max-len
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const { before, afterEach, describe, it } = require('mocha')
const { getAllVillains, getVillainsBySlug, createNewVillain } = require('../../controllers/villains')
const { villainsList, oneVillain } = require('../mocks/villains.test')

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - villains', () => {
  let sandbox
  let stubbedFindOne
  let stubbedSend
  let response
  let stubbedSendStatus
  let stubbedStatusSend
  let stubbedStatus

  before(() => {
    sandbox = sinon.createSandbox()

    stubbedFindOne = sandbox.stub(models.villains, 'findOne')

    stubbedSend = sandbox.stub()
    stubbedSendStatus = sandbox.stub()
    stubbedStatusSend = sandbox.stub()
    stubbedStatus = sandbox.stub()

    response = {
      send: stubbedSend,
      sendStatus: stubbedSendStatus,
      status: stubbedStatus
    }
  })

  afterEach(() => {
    sandbox.reset
  })

  describe('getAllVillains', () => {
    it('retrieves a list of all villains from the db and calls response.send() with the list', async () => {
      const stubbedFindAll = sinon.stub(models.villains, 'findAll').returns(villainsList)

      await getAllVillains({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(villainsList)
    })
  })

  describe('getVillainsBySlug', () => {
    it('retrieves a villain associated with provided slug from db and calls response.send with it', async () => {
      stubbedFindOne.returns(oneVillain)
      const request = { params: { slug: 'maleficent' } }

      await getVillainsBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'maleficent' } })
      expect(stubbedSend).to.have.been.calledWith(oneVillain)
    })

    it('returns 404 when no villain found', async () => {
      stubbedFindOne.returns(null)
      const request = { params: { slug: 'not-found' } }

      await getVillainsBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'not-found' } })
      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })
  })

  describe('createNewVillain', () => {
    it('acceps new villain info and saves them to the db, returning the saved record with a 201 status', async () => {
      const request = { body: oneVillain }

      stubbedStatus.returns({ send: stubbedStatusSend })
      const stubbedCreate = sinon.stub(models.villains, 'create').returns(oneVillain)

      await createNewVillain(request, response)

      expect(stubbedCreate).to.have.been.calledWith(oneVillain)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedSend).to.have.been.calledWith(oneVillain)
    })
  })
})
