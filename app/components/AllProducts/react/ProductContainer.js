import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { addToCart } from '../../ManageCart/reducers/reducer'

const Product = props => {
  console.log('props:', props && props.currentProduct)
  return (
    <div>
      <h1>Product Page: {props.currentProduct.name}</h1>
      <img src="http://lorempixel.com/250/250/nature" />
      <p>Quantity: {props.currentProduct.quantity}</p>
      <p>Price: ${props.currentProduct.price}</p>
      <button>
        <Link to={`/cart/products`}>Add to Cart</Link>
      </button>
      <br />
      <Link to='/products'>Continue Shopping</Link>
    </div>
  )
}

const mapStateToProps = state => ({
  currentProduct: state.products.product
})

const mapDispatchToProps = dispatch => ({
  dispatchToCart: (item) => {
    dispatch(addToCart(item))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)
