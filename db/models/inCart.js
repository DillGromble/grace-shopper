'use strict'

const Products = require('./products')
const Cart = require('./cart')
// const Product = require('./product')

const {INTEGER} = require('sequelize')

module.exports = db => db.define('inCart', {
  quantity: INTEGER
}, {
  defaultScope: () => ({
    include: [{
      all: true
    }]
  })
})
