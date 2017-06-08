'use strict'

const {INTEGER} = require('sequelize')

module.exports = db => db.define('inCart', {
  quantity: {
    type: INTEGER,
    defaultValue: 1
  }
}, {
  defaultScope: () => ({
    include: [{
      all: true
    }]
  })
})
