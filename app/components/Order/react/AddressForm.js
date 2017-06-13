import React from 'react'
import { Link } from 'react-router'

const AddressForm = props => (
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

export default AddressForm
