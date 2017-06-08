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
            foundIncart.update({quantity: req.body.quantity})
            .then(() => res.status(204).json('Updated cart.'))
          })
          .then(loadedCart => res.status(204).json(loadedCart))
        )
        .catch(next))

  // .put('/:id/cart/products',
  //   (req, res, next) =>
  //     Cart.findOrCreate({where: {user_id: req.params.id}})
  //     .then(foundCart => {
  //       InCart.findOrCreate({
  //         where: {
  //           cart_id: foundCart.id
  //         }
  //       }
  //     })
  //     .then(foundCart => res.json(foundCart))
  //     .catch(console.error.bind(console))
  // )
