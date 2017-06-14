'use-strict'

const db = require('APP/db')
const Cart = db.model('cart')
const InCart = db.model('inCart')
const Product = db.model('products')
module.exports = require('express').Router()

  .use('/', (req, res, next) =>
    Cart.findById(req.session.cart)
    .then(cart => {
      req.cart = cart
      if (!cart) return next('Cart with that id not found')
      next()
      return null
    })
    .catch(next)
  )

  .get('/', (req, res, next) =>
    req.cart.getProducts()
    .then(items => res.status(200).json(items))
  )

  .put('/products/add', (req, res, next) =>
    InCart.findOrCreate({
      where: { cart_id: req.cart.id, product_id: req.body.id },
      defaults: { cart_id: req.cart.id, product_id: req.body.id }
    })
    .spread( (row, wasMade) => {
      if (!wasMade) return row.update({ quantity: row.quantity + 1 })
      else return row
    })
    .then( (newRow) => {
      req.body.inCart = newRow.dataValues
      res.json(req.body)
    })
    .catch(next)
  )

  .put('/products/sub', (req, res, next) =>
    InCart.findOne({ where: { cart_id: req.cart.id, product_id: req.body.id } })
    .then( row => {
      if (row.quantity === 1) return row.destroy()
      else return row.update({ quantity: row.quantity - 1 })
    })
    .then( (rowUpdate) => {
      req.body.inCart = rowUpdate.dataValues
      res.json(rowUpdate)
    })
    .catch(next)
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
    .then( (newCart) => res.json(newCart))
    .catch(next)
  })

  .use((err, req, res, next) => {
    console.error(err)
    res.status(404).send('Not found')
  })
