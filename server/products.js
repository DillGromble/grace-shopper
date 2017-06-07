const products = require('express').Router()
const {Products} = require('APP/db')

products.get('/', (req, res, next) => {
  Products.findAll()
  .then(allProducts => res.json(allProducts))
  .catch(err => console.error(err))
})

module.exports = products
