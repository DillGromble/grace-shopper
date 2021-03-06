'use strict'

const {STRING, FLOAT, INTEGER, ENUM, TEXT} = require('sequelize')

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
  },
  description: {
    type: TEXT
  },
  imageURL: {
    type: TEXT,
    allowNull: false
  },
  type: {
    type: ENUM('Decorations', 'Clothing', 'Home', 'Outdoor Entertaining', 'Gifts', 'Misc'),
  }
})

module.exports.associations = (Products, {Holiday}) => {
  Products.belongsTo(Holiday)
}
