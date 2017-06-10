import React from 'react'
import {connect} from 'react-redux'
import ManageCart from './ManageCart'

const mapStateToProps = state => ({
  userName: state.cart.currentCart.user && state.cart.currentCart.user.name,
  itemsInCart: state.cart.currentCart.products && state.cart.currentCart.products.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    quantity: p.inCart.quantity,
  }))
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps)(ManageCart)
