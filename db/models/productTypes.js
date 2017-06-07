'use strict'

const {STRING} = require('sequelize')

module.exports = db => db.define('product_types', {
  name: {
    type: STRING,
    allowNull: false
  }
})

module.exports.associations = (Types, {Products}) => {
  Types.hasMany(Products)
}
