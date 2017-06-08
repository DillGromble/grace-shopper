import React from 'react'

const ManageCart = (props) => (
  <div>
    <h1>Your Cart Items:</h1>
    <div>
      <div className="col-xs-4"><h3>Item</h3></div>
      <div className="col-xs-4"><h3>Price</h3></div>
      <div className="col-xs-4"><h3>Quantity</h3></div>
    </div>
    <ul>
      {props.cartItems && props.cartItems.map(item => (
        <li key={item.id}>
          <div className="col-xs-4">{item.name}</div>
          <div className="col-xs-4">${item.price}</div>
          <div className="col-xs-4">{item.quantity}</div>
        </li>
      ))}
    </ul>
  </div>
)

export default ManageCart
