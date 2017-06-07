import React from 'react'

const ManageCart = (props) => (
  <div>
    <h1>Your Cart Items:</h1>
  </div>
)

export default ManageCart

/*
 <ul>
      {props.cartItems && props.cartItems.map(cartItem => {
        return (
          <li key={ cartItem.id }> Name: {cartItem.product.name} Price: {cartItem.product.price} </li>
        )
      })
      }
    </ul>
*/
