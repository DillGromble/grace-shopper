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
