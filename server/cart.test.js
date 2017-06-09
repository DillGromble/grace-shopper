import chai from 'chai'
import chaiProperties from 'chai-properties'
import chaiThings from 'chai-things'
chai.use(chaiProperties)
chai.use(chaiThings)
import sinon from 'sinon'

const db = require('APP/db')
const Cart = db.model('cart')

const request = require('supertest')
const app = require('./start')

/* global describe it beforeEach afterEach before */

describe.only('Cart API:', () => {
  var server
  before('Await database sync', () => db.didSync)
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  it('responds to /:id', (done) => {
    request(app)
      .get('/api/cart/1')
      .set('Accept', 'application/json')
      .expect((res) => {
        console.log(res.data)
      })
      .expect(201, done)
  })
})
