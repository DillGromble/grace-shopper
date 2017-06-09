import React from 'react'
import {connect} from 'react-redux'
import ManageCart from './ManageCart'

const mapStateToProps = state => ({
  cart: state.cart.cart,
  cartId: state.cart.id,
  products: state.products.products
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps)(ManageCart)
