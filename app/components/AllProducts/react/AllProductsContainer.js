import React from 'react'
import { connect } from 'react-redux'

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
                  <button>Add to Cart</button>
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

export default connect(mapState)(AllProducts)
