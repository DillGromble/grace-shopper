import React from 'react'
import { connect } from 'react-redux'
import { addToCart } from '../../ManageCart/reducers/reducer'

const AllProducts = props => (
  <div>
    <h1>You've landed at the all products page!</h1>
    <div className="row">
    {
      props.products && props.products
        .map(product => (
          <div className="col-xs-4" key={ product.id }>
              <img src="http://lorempixel.com/250/250/nature" />
              <div className="caption">
                <h5>
                  <span>{ product.name }</span>
                  <form onSubmit={ (e) => {
                    e.preventDefault()
                    props.dispatchToCart(product)
                  }
                  }>
                    <button>Add to Cart</button>
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
