import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { addToCart } from '../../ManageCart/reducers/reducer'

const SingleProduct = ({currentProduct, reviews, onCartAdd, handleChange, submitReview, user}) => (
    <div>
      <h1>Product Page: {currentProduct.name}</h1>
      <img src={currentProduct.imageURL} />
      <div id="customerReviews">X Reviews</div>
      <p>Quantity: {currentProduct.quantity}</p>
      <p>Price: ${currentProduct.price}</p>
      <p>Description: {currentProduct.description}</p>
      <form onSubmit={(evt) => onCartAdd(evt, currentProduct) }>
        <button>Add to Cart</button>
      </form>
      <br />
      <p>Reviews:</p>

      { user && (
      <form onSubmit={submitReview}>
        <label htmlFor="Subject">Subject: </label>
        <input type="text" name="subject" onChange={handleChange}/>

        <label htmlFor="Rating">Rating: </label>
        <select name="rating" onChange={handleChange}>
          <option value=""></option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <br />
        <textarea name="description" cols="30" rows="10" placeholder="Add your review here" onChange={handleChange}></textarea>
        <button>Submit your review</button>
      </form>
      )
      }

      <ul className="reviews">{reviews && reviews.map(review => (
        <li key={review.id} className="review">
          <p><strong>Subject:</strong> {review.subject}</p>
          <p><strong>Rating:</strong> {review.rating}</p>
          <p><strong>Description:</strong> {review.description}</p>
        </li>
      ))}</ul>
      <Link to='/products'>Continue Shopping</Link>
    </div>
)

export default SingleProduct
