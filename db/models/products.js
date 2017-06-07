'use strict'

const {STRING, FLOAT, INTEGER} = require('sequelize')

module.exports = db => db.define('products', {
  name: {
    type: STRING,
    allowNull: false
  },
  price: {
    type: FLOAT,
    validate: {
      isFloat: true,
      min: 0.00
    },
    allowNull: false,
    defaultValue: 0.00
  },
  quantity: {
    type: INTEGER,
    validate: { min: 0 },
    allowNull: false,
    defaultValue: 1
  }
})

module.exports.associations = (Products, {Holiday, Types}) => {
  Products.belongsTo(Holiday)
  Products.belongsTo(Types)
}
