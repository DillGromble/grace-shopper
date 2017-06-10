'use-strict'

const db = require('APP/db')
const Cart = db.model('cart')
const InCart = db.model('inCart')

module.exports = require('express').Router()

  .get('/products',
    (req, res, next) =>
      Cart.findById(req.session.cart)
      .then(currentCart => {
        if (!currentCart) return next('Cart with that id not found')
        else res.json(currentCart)
      })
      .catch(next)
  )

  .put('/products',
    (req, res, next) => {
      if (!req.body.price) return next('Invalid data type')

      return Cart.findById(req.session.cart)
      .then(cart => {
        if (!cart) {
          return next('Cart with that id not found')
        } else {
          return cart.addProduct(req.body.id)
          .then( add => {
            if (!add) res.status(500).send('Something went wrong')
            else res.sendStatus(200)
          })
        }
      })
      .catch(next)
    }
  )

  .put('/mergeCart/:userId', (req, res, next) => {
    const userId = req.params.userId
    const sessionCartId = req.session.cart

    return Cart.findOne({ where: { user_id: userId } })
    .then( cart => {
      if (!cart) {
        return Cart.update(
          { user_id: userId },
          { where: { id: sessionCartId } }
        )
      } else {
        return InCart.update(
          { cart_id: cart.id },
          { where: { cart_id: sessionCartId } }
        )
        .then( () => req.session.cart = cart.id)
      }
    })
    .then( () => res.sendStatus(200))
    .catch(next)
  })

  .use( (err, req, res, next) => {
    console.error(err)
    res.status(404).send('Not found')
  })
