'use-strict'

const db = require('APP/db')
const Cart = db.model('cart')
const InCart = db.model('inCart')

module.exports = require('express').Router()

  .get('/:id/products',
    (req, res, next) =>
      Cart.findById(req.params.id)
      .then(currentCart => {
        if (!currentCart) {
          res.json('Your cart is empty!')
        } else {
          res.json(currentCart)
        }
      })
      .catch(next)
  )

  .put('/:id/products',
    (req, res, next) => {
      console.log(req.session)
      return Cart.findById(req.params.id)
      .then(cart => {
        if (!cart) {
          console.log(req.params.id)
          console.log(req.body.product)
          res.sendStatus(404)
        } else {
          cart.addProduct(req.body.item).then( add => console.log(add))
          res.sendStatus(200)
        }
      })
      .catch(next)
    }
  )
