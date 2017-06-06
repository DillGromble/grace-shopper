'use strict'

const {STRING, ARRAY, JSON} = require('sequelize')

module.exports = db => db.define('orders', {
  address: {
    type: STRING,
    allowNull: false
  },
  status: {
    type: STRING,
    isIn: [['Created', 'Processing', 'Cancelled', 'Completed']]
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
