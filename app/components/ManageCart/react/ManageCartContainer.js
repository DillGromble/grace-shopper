import React from 'react'
import {connect} from 'react-redux'
import ManageCart from './ManageCart'

const mapStateToProps = state => ({
  cartItems: state.cartItems.cartItems,
  cartId: state.cartItems.cartId,
  products: state.products.products
})

const mapDispatchToProps = dispatch => ({
  // loadItems: () => {},
  // addItem: () => {},
  // removeItem: () => {},
  // updateItemQuantity: () => {},
  // loginAction: () => {}
})

export default connect(mapStateToProps)(ManageCart)
