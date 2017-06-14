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
        <h3>Hi! Below is a summary of your order:</h3>
        <div className="row">
          <div className="col-xs-4"><h3>Item</h3></div>
          <div className="col-xs-4"><h3>Price</h3></div>
          <div className="col-xs-4"><h3>Quantity</h3></div>
        </div>
          {items && items.map(item => (
            <div key={counter++} className="row">
                <div className="col-xs-4 itemCart">{item.name}</div>
                <div className="col-xs-4 itemCart">${item.price}</div>
                <div className="col-xs-4 itemCart">
                  {item.quantity}
                  <button
                  onClick={this.deleteClickedItem.bind(this, item)} className="deleteButton">
                    <span className="glyphicon glyphicon-minus"></span>
                </button>
                </div>
            </div>
          ))}
        <div>
          <h3>Total Price: ${items && items.reduce((total, item) => {
            total += item.price * item.quantity
            return total
          }, 0)}
          </h3>
        </div>
        {items.length ? <Link to="/order" className="button checkoutButton">
          <h2>Proceed To Checkout...</h2>
          </Link>
          : <h2>Add some items to your cart!</h2>}
      </div>
    )
  }
}
