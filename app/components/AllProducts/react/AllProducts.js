import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { addToCart } from '../../ManageCart/reducers/reducer'

const AllProducts = props => (
  <div>
    <h1>You've landed at the all products page!</h1>
    <div className="row">
    {
      props.products && props.products
        .map(product => (
          <div className="col-md-4" key={ product.id }>
              <img className="productImage" src={ product.imageURL } />
              <div className="caption">
                <h3>
                  <Link to={`/products/${product.id}`}>{ product.name }</Link>
                  <p>${ product.price }</p>
                  <form onSubmit={ (e) => props.onSubmit(e, product) }>
                    <button>Add to Cart</button>
                  </form>
                </h3>
              </div>
          </div>
        ))
    }
    </div>
  </div>
)

export default AllProducts
