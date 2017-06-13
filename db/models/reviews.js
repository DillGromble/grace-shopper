'use strict'

const {STRING, TEXT, ENUM} = require('sequelize')

module.exports = db => db.define('reviews', {
  subject: {
    type: STRING,
    allowNull: false
  },
  rating: {
    type: ENUM('1', '2', '3', '4', '5')
  },
  description: {
    type: TEXT
  }
})

module.exports.associations = (Reviews, {Products}) => {
  Reviews.belongsTo(Products)
}
