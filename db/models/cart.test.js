const db = require('APP/db')

import chai from 'chai'
import chaiProperties from 'chai-properties'
import chaiThings from 'chai-things'
chai.use(chaiProperties)
chai.use(chaiThings)
import sinon from 'sinon'

/* global describe it beforeEach afterEach after */

describe('Cart model tests:', () => {
  beforeEach('Synchronize and clear database', () => db.sync({force: true}))
  after('Synchronize and clear database', () => db.sync({force: true}))
})
// come back to this
