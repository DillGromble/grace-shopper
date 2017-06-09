import React from 'react'
import {Link} from 'react-router'

export function ManageCart(props) {
  const userName = props.userName
  const itemsInCart = props.itemsInCart

  return (
    <div>
      <h3>Hi, {userName}!  Below is a summary of your order:</h3>
      <div>
        <div className="col-xs-4"><h3>Item</h3></div>
        <div className="col-xs-4"><h3>Price</h3></div>
        <div className="col-xs-4"><h3>Quantity</h3></div>
      </div>
      <ul>
        {itemsInCart && itemsInCart.map(item => (
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
        <h3>Total Price: ${itemsInCart && itemsInCart.reduce((total, item) => {
          total += item.price * item.quantity
          return total
        }, 0)}
        </h3>
      </div>
      <Link to={`/${props.cartId}/checkout`}><h2>Proceed To Checkout...</h2></Link>
    </div>
  )
}

export default ManageCart
