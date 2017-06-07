'use strict'

const Products = require('./products')
const Cart = require('./cart')
// const Product = require('./product')

const {INTEGER} = require('sequelize')

module.exports = db => db.define('productQuantity', {
  quantity: INTEGER
})

// review Product table name with Josh
module.exports.associations = (ProductQuantity, {Products, Cart}) => {
  ProductQuantity.belongsToMany(Products)
  ProductQuantity.belongsToMany(Cart)
}
