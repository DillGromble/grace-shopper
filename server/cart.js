 'use strict'

 const db = require('APP/db')
//  const Cart = db.model('cart')

 module.exports = require('express').Router()
 .get('/',
  (req, res, next) => {
    res.send('this is the carts page')
  }
 )

  // .get('/:id/cart',
  //   mustBeLoggedIn,
  //   (req, res, next) =>
  //   User.findById(req.params.id)
  //   .then(user => {
  //     res.json(user)
  //   })
  //   .catch(next))

  //     Product.findAll({
  //       where: {
  //         UserCart:
  //       }
  //     })
