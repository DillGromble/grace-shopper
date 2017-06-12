import React from 'react'
import {connect} from 'react-redux'
import ManageCart from './ManageCart'

const mapStateToProps = state => ({
  items: state.cart.items && state.cart.items.map(p => {
    console.log(p)
    return ({
      id: p.id,
      name: p.name,
      price: p.price,
      quantity: p.inCart.quantity,
    })
  })
})

export default connect(mapStateToProps)(ManageCart)
