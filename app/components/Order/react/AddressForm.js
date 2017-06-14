import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect, hashHistory } from 'react-redux'
import { createOrder } from '../reducers/order'

/* --- --- --- --- Dumb Component --- --- --- --- */

class AddressForm extends Component {
  render() {
    const items = this.props.items
    const createOrderDispatcher = this.props.createOrderDispatcher

    return (
      <div>
        <h2>Billing and Shipping Details:</h2>
        <div>
          <form
            className="addressDetails"
            label="shippingAddress"
            onSubmit={evt => {
              evt.preventDefault()
              const address = `${evt.target.address.value}, ${evt.target.city.value}, ${evt.target.state.value}, ${evt.target.zip.value}`
              const email = evt.target.email.value
              createOrderDispatcher(address, email, items)
            } }>
            <input name ="address" placeholder="Street Address" />
            <input name ="city" placeholder="City" />
            <input name ="state" placeholder="State" />
            <input name ="zip" placeholder="Zip Code" />
            <input name ="email" placeholder="Please confirm email" />
            <br/>
            <button className="smallerButton" type="submit" value="Confirm Order">Confirm Order</button>
          </form>
        </div>
        <h3>{this.props.order && this.props.order.currentOrder}</h3>
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
    order: state.order
  }))
})

const mapDispatchToProps = dispatch => ({
  createOrderDispatcher: function(address, email, items) {
    dispatch(createOrder(address, email, items))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressForm)
