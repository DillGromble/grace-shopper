import chai from 'chai'
import chaiProperties from 'chai-properties'
import chaiThings from 'chai-things'
chai.use(chaiProperties)
chai.use(chaiThings)
import sinon from 'sinon'

const expect = chai.expect

const db = require('APP/db')
const Cart = db.model('cart')
const User = db.model('users')
const Products = db.model('products')
const InCart = db.model('inCart')

const request = require('supertest')
const app = require('./start')

/* global describe xit it xdescribe beforeEach afterEach before */

describe.only('/api/cart:', () => {
  var server, user, cart, product

  before('Await database sync', () => db.didSync)
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  beforeEach(() => User.create({ email: 'god@example.com', name: 'So many names', password: '1234' })
    .then( u => user = u)
    .then( () => Cart.create({ user_id: user.id }))
    .then( c => cart = c)
    .then( () => Products.create({name: 'Christmas Tree', price: 100, type: 'Home'}))
    .then( p => product = p)
  )

  describe('returns items in a users cart:', () => {

    beforeEach(() => server = request.agent(app))

    it('returns items in cart:', () =>
      server
        .put(`/api/cart/products/add`)
        .send(product)
        .then( () =>
          server.get(`/api/cart/products`)
          .expect(200)
        )
        .then(res => expect(res.body).to.have.length(1))
    )
  })

  xdescribe('adds an item to a users cart:', () => {

    xit('adds one item to the cart:', (done) => {
      request(app)
        .put(`/api/cart/products/add`)
        .send(product)
        .expect(200, done)
    })

    xit('fails if cart doesn\'t exist', (done) => {
      app
        .put(`/api/cart/000/products`)
        .send(product)
        .expect(404, done)
    })
  })
})
