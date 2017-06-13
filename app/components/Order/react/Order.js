import React, { Component } from 'react'
import {Link} from 'react-router'
import AddressForm from './AddressForm'

export default class Order extends Component {
  render() {
    const items = this.props.items
    let counter = 0

    return (
      <div>
        <h3>Please confirm order details!</h3>
        <div>
          <div className="col-xs-4"><h3>Item</h3></div>
          <div className="col-xs-4"><h3>Price</h3></div>
          <div className="col-xs-4"><h3>Quantity</h3></div>
        </div>
          {items && items.map(item => (
            <div key={counter++}>
                <div className="col-xs-4">{item.name}</div>
                <div className="col-xs-4">${item.price}</div>
                <div className="col-xs-4">{item.quantity}</div>
            </div>
          ))}
        <div>
          <h3>Total Price: ${items && items.reduce((total, item) => {
            total += item.price * item.quantity
            return total
          }, 0)}
          </h3>
        </div>
        <AddressForm />
      </div>
    )
  }
}
