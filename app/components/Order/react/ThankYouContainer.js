import React, { Component } from 'react'
import { connect } from 'react-redux'

/* --- --- --- --- Dumb Component --- --- --- --- */

class ThankYou extends Component {
  render() {
    console.log('PROPS IN ThankYou: ', this.props)
    const userName = this.props.user && this.props.user.name

    return (
      <div>
        <h3>Thank you for shopping with us, {userName}!</h3>
        <h3>Please reference order number ##### for all future inquiries.</h3>
      </div>
    )
  }
}

/* --- --- --- --- Smart Container --- --- --- --- */

const mapStateToProps = state => ({
  user: state.auth,
})

export default connect(mapStateToProps)(ThankYou)
