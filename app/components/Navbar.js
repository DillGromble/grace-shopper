import React, { Component } from 'react'
import { Link } from 'react-router'
import Login from './Login'
import WhoAmI from './WhoAmI'

const Navbar = ({user, cart}) => (
  <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <Link to="/" className="navbar-brand">Home</Link>
      </div>

      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav">
          <li><Link to="/products">All Products</Link></li>
          <li><Link to="/cart/products">
            Cart {cart.length > 0 ? `(${cart.reduce((a, b) => a + b.inCart.quantity, 0)})` : ''}
          </Link></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li className="active">{user ? <WhoAmI/> : <Login/>}</li>
          { user ? '' : <button><Link to="/Signup">Signup</Link></button> }
        </ul>
      </div>
    </div>
  </nav>
)

import {connect} from 'react-redux'

export default connect(
  ({ auth, cart }) => ({ user: auth, cart: cart.items })
)(Navbar)
