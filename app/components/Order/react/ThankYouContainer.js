import React, { Component } from 'react'
import { connect } from 'react-redux'

/* --- --- --- --- Dumb Component --- --- --- --- */

class ThankYou extends Component {
  render() {
    const userName = this.props.user && this.props.user.name
    const orderNumber = this.props.currentOrder && this.props.currentOrder.id
    const address = this.props.currentOrder && this.props.currentOrder.address

    return (
      <div>
        <h3>Thank you for shopping with us, {userName}!</h3>
        <h3>Please reference order number {orderNumber} for all future inquiries.</h3>
        <h3>We will be shipping to { address }.</h3>
      </div>
    )
  }
}

/* --- --- --- --- Smart Container --- --- --- --- */

const mapStateToProps = state => ({
  user: state.auth,
  currentOrder: state.order.currentOrder,
})

export default connect(mapStateToProps)(ThankYou)
