'use-strict'

const db = require('APP/db')
const Cart = db.model('cart')
const InCart = db.model('inCart')

module.exports = require('express').Router()
  .get('/:id',
    (req, res, next) =>
      Cart.findOrCreate({where: {id: req.params.id}})
      .then(cart => res.status(201).json(cart))
      .catch(next))
  .get('/:id/products',
      (req, res, next) =>
        Cart.findOne({where: {id: req.params.id}})
        .then(cart => {
          if (!cart) return res.json('Sign up to continue shopping.')
          const cartItems = cart.sortCartForCheckout(cart)
          res.status(201).json(cartItems)
        })
        .catch(next))
  .put('/:id/products',
      (req, res, next) =>
        Cart.findOne({where: {id: req.params.id}})
        .then(foundCart =>
          InCart.findOne({
            where: {
              cart_id: foundCart.id,
              product_id: req.body.id
            }
          })
          .then(foundIncart => {
            if (!foundIncart) return InCart.create({cart_id: req.params.id, product_id: req.body.id})
            const newQuanity = foundIncart.quantity + req.body.amount
            return foundIncart.update({quantity: newQuanity})
            .then(() => res.status(204).json('Updated cart.'))
          })
        )
        .catch(next))