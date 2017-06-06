import React from 'react'

const Form = props => (
  <div>
    <h2>Please complete order details:</h2>
    <form label="shippingAddress">
      <input name ="address" placeholder="Street Address" />
      <input name ="city" placeholder="City" />
      <input name ="state" placeholder="State" />
      <input name ="zip code" placeholder="Zip Code" />
      <input name ="email" placeholder="Please confirm email" />
    </form>
  </div>
)

export default Form
