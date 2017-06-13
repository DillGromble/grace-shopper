import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux';
// NEED TO IMPORT ACTION

/* --- --- --- --- Dumb Component --- --- --- --- */

class AddressForm extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h2>Please complete order details:</h2>
        <form label="shippingAddress">
          <input name ="address" placeholder="Street Address" />
          <input name ="city" placeholder="City" />
          <input name ="state" placeholder="State" />
          <input name ="zip code" placeholder="Zip Code" />
          <input name ="email" placeholder="Please confirm email" />
          <Link><h2>Confirm Order</h2></Link>
        </form>
      </div>
    )
  }
}

/* --- --- --- --- Smart Container --- --- --- --- */

const mapDispatchToProps = dispatch => ({
  // SOME ACTION
})

export default AddressForm
