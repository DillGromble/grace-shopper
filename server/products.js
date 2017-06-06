const products = require('express').Router()

products.get('/', (req, res, next) => {
  res.send('You must be looking for all the products!')
})

module.exports = products
