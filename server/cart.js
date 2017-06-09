'use-strict'

const db = require('APP/db')
const Cart = db.model('cart')
const InCart = db.model('inCart')

module.exports = require('express').Router()

  .get('/:id/products',
    (req, res, next) =>
      Cart.findOne({
        where: {
          id: req.params.id
        }
      })
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
      (req, res, next) =>
        Cart.findOne({where: {user_id: req.params.id}})
        .then(cart => {
          if (!cart) {
            return Cart.create({user_id: this.id})
            .then(newCart => InCart.create({cart_id: newCart.id, product_id: req.body.id}))
          }
          return InCart.findOne({
            where: {
              cart_id: cart.id,
              product_id: req.body.id
            }
          })
          .then(foundIncart => {
            if (!foundIncart) return InCart.create({cart_id: req.params.id, product_id: req.body.id})
            const newQuanity = foundIncart.quantity + req.body.amount
            return foundIncart.update({quantity: newQuanity})
            .then(() => res.status(204).json('Updated cart.'))
          })
        })
        .catch(next))
