'use strict'

module.exports = db => db.define('cart', {}, {
  defaultScope: {
    include: [{
      all: true
    }]
  },
  instanceMethods: {
    sortCart: (cart) => cart.products.reduce((sortedCart, item) => {
      for (let i = 0; i < sortedCart.length; i++) {
        if (sortedCart[i].name === item.name) {
          sortedCart[i].quantity++
          return sortedCart
        }
      }
      sortedCart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.inCart.quantity,
        user_id: cart.user_id
      })
      return sortedCart
    }, [])
  }
})

module.exports.associations = (Cart, {User, Products, InCart}) => {
  Cart.belongsToMany(Products, {through: InCart})
  Cart.belongsTo(User)  // userId attached to cart
}
