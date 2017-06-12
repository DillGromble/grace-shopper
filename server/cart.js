'use-strict'

const db = require('APP/db')
const Cart = db.model('cart')
const InCart = db.model('inCart')

module.exports = require('express').Router()

  .get('/:id/products',
    (req, res, next) =>
      Cart.findById(req.params.id)
      .then(currentCart => {
        if (!currentCart) return next('Cart with that id not found')
        else res.json(currentCart)
      })
      .catch(next)
  )

  .put('/:id/products',
    (req, res, next) => {
      if (!req.body.price) return next('Invalid data type')

      Cart.findById(req.params.id)
      .then(cart => {
        if (!cart) {
          return next('Cart with that id not found')
        } else {
          cart.addProduct(req.body.id)
          .then( add => {
            if (!add) res.status(500).send('Something went wrong')
            else res.sendStatus(200)
          })
        }
      })
      .catch(next)
    }
  )

  .use( (err, req, res, next) => {
    console.error(err)
    res.status(404).send('Not found')
  })
