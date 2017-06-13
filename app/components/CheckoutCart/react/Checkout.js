import React from 'react'
import AddressForm from './AddressForm'
import {connect} from 'react-redux'

const Checkout = ({ items }) => (
  <div>
    <div>
      <h1>Here's the checkout page, buy stuff now!</h1>
        <AddressForm />
    </div>
    <div>
      <h1>Total Price: ${Array.isArray(items) && items.reduce((total, item) => {
        total += item.price * item.quantity
        return total
      }, 0)}
      </h1>
    </div>
  </div>
)

const mapStateToProps = state => ({
  items: state.cart.items
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
