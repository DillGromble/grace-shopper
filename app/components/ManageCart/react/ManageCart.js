import React from 'react'
import {Link} from 'react-router'

export function ManageCart({ items }) {

  return (
    <div>
      <h3>Below is a summary of your order:</h3>
      <div>
        <div className="col-xs-4"><h3>Item</h3></div>
        <div className="col-xs-4"><h3>Price</h3></div>
        <div className="col-xs-4"><h3>Quantity</h3></div>
      </div>
      <ul>
        {items && items.map(item => (
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
        <h3>Total Price: ${items && items.reduce((total, item) => {
          total += item.price * item.quantity
          return total
        }, 0)}
        </h3>
      </div>
      <Link to={`/checkout`}><h2>Proceed To Checkout...</h2></Link>
    </div>
  )
}

export default ManageCart
