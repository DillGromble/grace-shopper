'use strict'

const db = require('APP/db')
const User = db.model('users')
const Order = db.model('orders')
const Cart = db.model('cart')
const InCart = db.model('inCart')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  // GET api/order
  .get('/',
    (req, res, next) =>
      Order.findAll({})
      .then(orders => res.send(orders))
      .catch(next)
  )

  // POST api/order
  .post('/',
    (req, res, next) => {
      if (!req.session.passport.user) return next('User is not logged in')
      User.findOne({
        where: {
          email: req.body.email,
        }
      })
      .then(user => {
        if (user && user.id === req.session.passport.user) {
          return Order.create({
            address: req.body.address,
            items: req.body.items,
            user_id: user.id,
          })
          .then(() => {
            InCart.destroy({
              where: {
                cart_id: req.session.cart
              }
            })
          })
        } else {
          return next("Email doesn't match current user's email")
        }
      })
      .catch(next)
    })
