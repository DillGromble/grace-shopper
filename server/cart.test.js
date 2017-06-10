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

const request = require('supertest')
const app = request(require('./start'))

/* global describe xit it xdescribe beforeEach afterEach before */

describe('Cart API:', () => {
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
    beforeEach(() => cart.addProduct(product))

    it('returns items if cart exists:', (done) => {
      app
        .get(`/api/cart/${cart.id}/products`)
        .expect( res => {
          expect(res.body.products).to.have.length(1)
        })
        .expect(200, done)
    })

    it('fails if cart doesn\'t exist', (done) => {
      app
        .get(`/api/cart/000/products`)
        .send(product)
        .expect(404, done)
    })
  })

  describe('adds an item to a users cart:', () => {

    it('adds one item to the cart:', (done) => {
      app
        .put(`/api/cart/${cart.id}/products`)
        .send(product)
        .expect(200, done)
    })

    it('fails if cart doesn\'t exist', (done) => {
      app
        .put(`/api/cart/000/products`)
        .send(product)
        .expect(404, done)
    })
  })
})
