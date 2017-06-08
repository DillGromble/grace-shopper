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
        <div key={item.id}>
          <li>
            <div className="col-xs-4">{item.name}</div>
            <div className="col-xs-4">${item.price}</div>
            <div className="col-xs-4">{item.quantity}</div>
          </li>
        </div>
      ))}
    </ul>
    <div>
      <h1>Total Price: ${props.cartItems && props.cartItems.reduce((total, item) => {
        total += item.price * item.quantity
        return total
      }, 0)}
      </h1>
    </div>
    <h2>Proceed To Checkout...</h2>
  </div>
)

export default ManageCart
