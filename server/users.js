'use strict'

const db = require('APP/db')
const User = db.model('users')
const Cart = db.model('cart')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/',
    // The forbidden middleware will fail *all* requests to list users.
    // Remove it if you want to allow anyone to list all users on the site.
    //
    // If you want to only let admins list all the users, then you'll
    // have to add a role column to the users table to support
    // the concept of admin users.
    forbidden('listing users is not allowed'),
    (req, res, next) =>
      User.findAll()
        .then(users => res.json(users))
        .catch(next))
  .post('/',
    (req, res, next) =>
      User.create(req.body)
      .then(user => res.status(201).json(user))
      .catch(next))
  .get('/:id',
    mustBeLoggedIn,
    (req, res, next) =>
      User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(next))
  .get('/:id/cart',
    mustBeLoggedIn,
    (req, res, next) =>
      User.findById(req.params.id)
      .then(user => {
        Cart.findOrCreate({where: {userId: req.params.id}})
      })
      .then(cart => res.status(201).json(cart))
      .catch(next))
  .get('/:id/cart/products',
      (req, res, next) =>
        Cart.findOne({where: {user_id: req.params.id}})
        .then(cart => {
          const cartItems = cart.products.map(product => {
            return {
              id: product.id,
              name: product.name,
              price: product.price,
              quantity: product.inCart.quantity
            }
          })
          res.json(cartItems)
        })
        .catch(next))
