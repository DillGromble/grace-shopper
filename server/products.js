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

products.post('/:id/reviews', (req, res, next) => {
  return Reviews.create({
    subject: req.body.subject,
    rating: req.body.rating,
    description: req.body.description,
    product_id: req.body.productId,
    user_id: req.body.userId
  })
  .then(review => res.json(review))
  .catch(err => console.error(err))
})

module.exports = products
