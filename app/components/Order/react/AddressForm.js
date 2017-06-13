import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { createOrder } from '../reducers/order'

/* --- --- --- --- Dumb Component --- --- --- --- */

class AddressForm extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log('props in AddressForm: ', this.props)

    return (
      <div>
        <h2>Please complete order details:</h2>
        <form
          label="shippingAddress"
          onSubmit={evt => {
            evt.preventDefault()
            const address = `${evt.target.address.value}, ${evt.target.city.value}, ${evt.target.state.value}, ${evt.target.zip.value}`
            const email = evt.target.email.value
            console.log('ADDRESS IN ADDRESS FORM:', address)
            console.log('EMAIL IN ADDRESS FORM:', email)
          } }>
          <input name ="address" placeholder="Street Address" />
          <input name ="city" placeholder="City" />
          <input name ="state" placeholder="State" />
          <input name ="zip" placeholder="Zip Code" />
          <input name ="email" placeholder="Please confirm email" />
          <input type="submit" value="Confirm Order" />
        </form>
      </div>
    )
  }
}

/* --- --- --- --- Smart Container --- --- --- --- */

const mapStateToProps = state => ({
  items: state.cart.items && state.cart.items.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    quantity: p.inCart.quantity,
  }))
})

const mapDispatchToProps = dispatch => ({
  createOrderDispatcher: function(address, email, items) {
    dispatch(createOrder(address, email, items))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressForm)
