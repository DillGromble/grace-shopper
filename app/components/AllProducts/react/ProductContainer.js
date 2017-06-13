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
      <p>Reviews:</p>
      <ul className="reviews">{props.reviews && props.reviews.map(review => (
        <li key={review.id} className="review">
          <p><strong>Subject:</strong> {review.subject}</p>
          <p><strong>Rating:</strong> {review.rating}</p>
          <p><strong>Description:</strong> {review.description}</p>
        </li>
      ))}</ul>
      <Link to='/products'>Continue Shopping</Link>
    </div>
)

const mapStateToProps = state => ({
  currentProduct: state.products.product,
  reviews: state.products.product.reviews
})

const mapDispatchToProps = dispatch => ({
  dispatchToCart: (item) => {
    dispatch(addToCart(item))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)
