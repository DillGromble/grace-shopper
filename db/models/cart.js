'use strict'

const {INTEGER} = require('sequelize')

module.exports = db => db.define('cart', {}, {
  defaultScope: {
    include: [{
      all: true
    }]
  }
})

// review Product table name with Josh
module.exports.associations = (Cart, {User, Products, InCart}) => {
  Cart.belongsToMany(Products, {through: InCart})
  Cart.belongsTo(User)  // userId attached to cart
}
