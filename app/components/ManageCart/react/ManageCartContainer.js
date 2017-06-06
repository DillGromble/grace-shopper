import React from 'react'
import {connect} from 'react-redux'
import ManageCart from './ManageCart'

const mapStateToProps = state => ({
  // user's items in cart: state.userItems
})

const mapDispatchToProps = dispatch => ({
  // addItem: () => {},
  // removeItem: () => {},
  // updateItemQuantity: () => {},
  // loginAction: () => {}
})

export default connect(mapStateToProps)(ManageCart)
