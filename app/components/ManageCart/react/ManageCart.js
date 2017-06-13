import React, { Component } from 'react'
import {Link} from 'react-router'

export default class ManageCart extends Component {
  constructor(props) {
    super(props)
    this.deleteClickedItem = this.deleteClickedItem.bind(this)
  }

  deleteClickedItem(item) {
    this.props.removeItem(item)
  }

  render() {
    const items = this.props.items
    let counter = 0

    return (
      <div>
        <h3>Hi!  Below is a summary of your order:</h3>
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
                <button
                  className="btn btn-default btn-xs"
                  onClick={this.deleteClickedItem.bind(this, item)}
                >Remove {item.name} from Cart</button>
            </div>
          ))}
        <div>
          <h3>Total Price: ${items && items.reduce((total, item) => {
            total += item.price * item.quantity
            return total
          }, 0)}
          </h3>
        </div>
        <Link to="/order"><h2>Proceed To Checkout...</h2></Link>
      </div>
    )
  }
}
