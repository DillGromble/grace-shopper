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
const app = require('./start')

/* global describe xit it xdescribe beforeEach afterEach before */

xdescribe('Cart API:', () => {
  var server, user, cart, product

  before('Await database sync', () => db.didSync)
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  beforeEach(() => User.create({ email: 'god@example.com', name: 'So many names', password: '1234' })
    .then(u => user = u)
  )
  beforeEach(() => Cart.create({ user_id: user.id })
    .then( c => cart = c)
    .then(() => Products.create({name: 'Christmas Tree', price: 100, type: 'Home'}))
    .then(p => product = p)
  )

  describe('returns items in a users cart:', () => {
    beforeEach(() => cart.addProduct(product))

    it('returns items if cart exists:', (done) => {
      request(app)
        .get('/api/cart/1/products')
        .expect( res => {
          expect(res.body.products).to.have.length(1)
        })
        .expect(200, done)
    })
  })

  xdescribe('adds an item to a users cart:', () => {

    it('adds one item to the cart:', (done) => {
      request(app)
        .put('/api/cart/1/products', product)
        .expect( res => {
          console.log('---')
        })
        .expect(200, done)
    })
  })
})
