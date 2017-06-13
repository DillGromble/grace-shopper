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
          <div className="col-xs-4" key={ product.id }>
              <img src={product.imageURL} />
              <div className="caption">
                <h5>
                  <Link to={`/products/${product.id}`}>{ product.name }</Link>
                  <form onSubmit={ (e) => {
                    e.preventDefault()
                    props.dispatchToCart(product)
                  }
                  }>
                    <button>
                      <Link to={`/cart/products`}>Add to Cart</Link>
                    </button>
                  </form>
                </h5>
              </div>
          </div>
        ))
    }
    </div>
  </div>
)
const mapState = state => ({
  products: state.products.products
})

const mapDispatch = dispatch => ({
  dispatchToCart: (item) => {
    dispatch(addToCart(item))
  }
})

export default connect(mapState, mapDispatch)(AllProducts)
