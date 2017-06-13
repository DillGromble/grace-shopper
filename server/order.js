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
    (req, res, next) =>
      User.findOne({
        where: {
          email: req.body.email,
        }
      })
      .then(user => {
        if (user) {
          return Order.create({
            address: req.body.address,
            items: req.body.items,
            user_id: user.id,
          })
        } else {
          res.send('Please log in before proceeding to checkout!')
        }
      })
      .catch(next)
  )
