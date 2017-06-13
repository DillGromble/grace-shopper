import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { addToCart } from '../../ManageCart/reducers/reducer'

const Product = props => (
    <div>
      <h1>Product Page: {props.currentProduct.name}</h1>
      <img src={props.currentProduct.imageURL} />
      <div id="customerReviews">X Reviews</div>
      <p>Quantity: {props.currentProduct.quantity}</p>
      <p>Price: ${props.currentProduct.price}</p>
      <p>Description: {props.currentProduct.description}</p>
      <form onSubmit={(e) => {
        e.preventDefault()
        props.dispatchToCart(props.currentProduct)
      }}>
        <button>Add to Cart</button>
      </form>
      <br />
      <Link to='/products'>Continue Shopping</Link>
    </div>
)

const mapStateToProps = state => ({
  currentProduct: state.products.product
})

const mapDispatchToProps = dispatch => ({
  dispatchToCart: (item) => {
    dispatch(addToCart(item))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)
