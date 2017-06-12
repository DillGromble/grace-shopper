const products = require('express').Router()
const {Products} = require('APP/db')

products.get('/', (req, res, next) => {
  Products.findAll()
  .then(allProducts => res.json(allProducts))
  .catch(err => console.error(err))
})

products.get('/:id', (req, res, next) => {
  Products.findById(req.params.id)
  .then(product => res.json(product))
  .catch(err => console.error(err))
})

module.exports = products
