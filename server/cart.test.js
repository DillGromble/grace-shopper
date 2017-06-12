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

describe('/api/cart:', () => {
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

    it('returns items in cart:', async () => {
      await server
        .put(`/api/cart/products/add`)
        .send(product)
      const res = await server
        .get(`/api/cart/products`)
        .expect(200)
      expect(res.body).to.have.length(1)
    }
      // // V regular promise structure V
      // server
      //   .put(`/api/cart/products/add`)
      //   .send(product)
      //   .then( () =>
      //     server.get(`/api/cart/products`)
      //     .expect(200)
      //   )
      //   .then(res => expect(res.body).to.have.length(1))
    )
  })

  describe('adds items to a users cart:', () => {

    beforeEach(() => server = request.agent(app))

    it('adds one item to the cart:', (done) => {
      server
        .put(`/api/cart/products/add`)
        .send(product)
        .expect(200, done)
    })

    it('can add many of the same item to a cart:', async () => {
      await server
        .put(`/api/cart/products/add`)
        .send(product)
      await server
        .put(`/api/cart/products/add`)
        .send(product)
      const res = await server
        .get(`/api/cart/products`)
        .expect(200)
      expect(res.body[0].inCart.quantity).to.equal(2)
    })
  })

  describe('subtracts items from a users cart', () => {

    beforeEach(async () => {
      server = request.agent(app)
      await server
        .put(`/api/cart/products/add`)
        .send(product)
      await server
        .put(`/api/cart/products/add`)
        .send(product)
    })

    it('can subtract one item from the cart', async () => {
      await server
        .put(`/api/cart/products/sub`)
        .send(product)
      const res = await server
        .get(`/api/cart/products`)
        .expect(200)
      expect(res.body[0].inCart.quantity).to.equal(1)
    })

    it('upon subtracting last item, destroys the inCart row:', async () => {
      await server
        .put(`/api/cart/products/sub`)
        .send(product)
      await server
        .put(`/api/cart/products/sub`)
        .send(product)
      const res = await server
        .get(`/api/cart/products`)
        .expect(200)
      expect(res.body).to.have.length(0)

    })
  })
})
