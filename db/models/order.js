'use strict'

const {STRING, JSON, ENUM, ARRAY} = require('sequelize')

module.exports = db => db.define('orders', {
  address: {
    type: STRING,
    allowNull: false
  },
  status: {
    type: ENUM,
    values: ['Created', 'Processing', 'Cancelled', 'Completed'],
    defaultValue: 'Created',
  },
  items: {
    type: ARRAY(JSON), // current assumption is element: {product: '', price:NUM, quantity: NUM}
    allowNull: false
  },
})

module.exports.association = (Order, {User}) => {
  Order.belongsTo(User)
  // pull items from cart
}
