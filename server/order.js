'use strict'

const db = require('APP/db')
const User = db.model('users')
const Order = db.model('orders')

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
      if (!req.session.passport.user) res.send('Please log in or create an account')
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
        } else {
          res.send("Email doesn't match user email")
        }
      })
      .catch(next)
    })
