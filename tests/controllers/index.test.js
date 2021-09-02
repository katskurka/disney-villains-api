const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const { before, beforeEach, after, afterEach, describe, it } = require('mocha')
const { getAllVillains, getVillainsBySlug, createNewVillain } = require('../..controllers/villains')
const { } = require('../mocks/villains.test')

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - villains', () => {
  describe('getAllVillains', () => {})

  describe('getVillainBySlug', () => {})

  describe('createNewVillain', () => {})
})