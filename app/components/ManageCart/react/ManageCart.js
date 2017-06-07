import React from 'react'

const ManageCart = (props) => {
  console.log(props.cartItems)
  return (
  <div>
    <h1>Your Cart Items:</h1>
    <ul>
      {props.cartItems && props.cartItems.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  </div>
  )
}

export default ManageCart
