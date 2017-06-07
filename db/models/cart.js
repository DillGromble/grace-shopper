'use strict'

module.exports = db => db.define('cart', {}, {
  defaultScope: {
    include: [{
      all: true
    }]
  }
})

module.exports.associations = (Cart, {User, Products, InCart}) => {
  Cart.belongsToMany(Products, {through: InCart})
  Cart.belongsTo(User)  // userId attached to cart
}
