'use strict'

const {STRING, BOOLEAN} = require('sequelize')

module.exports = db => db.define('holiday', {
  name: {
    type: STRING
  },
  isDiscounted: {
    type: BOOLEAN,
    defaultValue: true
  }
})

module.exports.associations = (Holiday, {Products}) => {
  Holiday.hasMany(Products)
}
