const products = require('express').Router()
const {Products, Reviews} = require('APP/db')

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

products.get('/:id/reviews', (req, res, next) => {
  Reviews.findAll({
    where: {
      product_id: req.params.id
    }
  })
  .then(reviews => res.json(reviews))
  .catch(err => console.error(err))
})

module.exports = products
