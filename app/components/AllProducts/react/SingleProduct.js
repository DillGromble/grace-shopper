import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { addToCart } from '../../ManageCart/reducers/reducer'

const SingleProduct = ({currentProduct, reviews, onCartAdd, handleChange, submitReview, user} ) => (
  <div className="container-fluid">
    <div className="row left col-md-4">
      <h1>Product Page: {currentProduct.name}</h1>
      <img src={currentProduct.imageURL} />
    </div>

    <div className="row right col-md-8">
      <div id="customerReviews">X <a href="#identifier">Reviews</a>
      </div>
        <p>Quantity: {currentProduct.quantity}</p>
        <p>Price: ${currentProduct.price}</p>
        <p>Description: {currentProduct.description}</p>
        <form onSubmit={(evt) => onCartAdd(evt, currentProduct) }>
          <button>Add to Cart</button>
        </form>
        <br />
    </div>

    <div className="row col-md-10">
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

        <a name="identifier">Reviews</a>
        <ul className="reviews">{reviews && reviews.map(review => (
          <li key={review.id} className="review">
            <p className="reviewSubject"> {review.subject}</p>
            <p><strong>{review.rating} <span className="glyphicon glyphicon-star"></span></strong></p>
            <p><strong>Description:</strong> {review.description}</p>
          </li>
        ))}</ul>
        <Link to='/products'>Continue Shopping</Link>
    </div>
  </div>
)

export default SingleProduct
