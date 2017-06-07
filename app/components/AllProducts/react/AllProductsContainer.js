import React from 'react'
import { connect } from 'react-redux'

const AllProducts = props => (
  <div>
    <h1>You've landed at the all products page!</h1>
    <ul>
      {
        props.products && props.products.map(product => (
          <li key={ product.id }>{ product.name }</li>
          ))
      }
    </ul>
  </div>
)

const mapState = state => ({
  products: state.products.products
})

export default connect(mapState)(AllProducts)
