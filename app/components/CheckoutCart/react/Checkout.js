import React from 'react'
import AddressForm from './AddressForm'
import {connect} from 'react-redux'

const Checkout = props => (
  <div>
    <div>
      <h1>Here's the checkout page, buy stuff now!</h1>
        <AddressForm />
    </div>
    <div>
      <h1>Total Price: ${Array.isArray(props.cartItems) && props.cartItems.reduce((total, item) => {
        total += item.price * item.quantity
        return total
      }, 0)}
      </h1>
    </div>
  </div>
)

const mapStateToProps = state => ({
  products: state.products.products,
  cartItems: state.cartItems.cartItems
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
