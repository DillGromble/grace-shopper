'use strict'

const User = require('./user')
// const Product = require('./product')

const {INTEGER} = require('sequelize')

module.exports = db => db.define('cart')

// review Product table name with Josh
module.exports.associations = (Cart, {User, Products}) => {
  Cart.belongsTo(User, {through: 'UserCart'})
  Cart.belongsToMany(Products, {through: 'CartItems'})
}
