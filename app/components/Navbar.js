import React, { Component } from 'react'
import { Link } from 'react-router'
import Login from './Login'
import WhoAmI from './WhoAmI'

const Navbar = ({user}) => (
  <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <Link to="/" className="navbar-brand">Home</Link>
      </div>

      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav">
          <li><Link to="/products">All Products</Link></li>
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
            <ul className="dropdown-menu">
              <li><a href="#">Action</a></li>
              <li><a href="#">Another action</a></li>
              <li><a href="#">Something else here</a></li>
              <li role="separator" className="divider" />
              <li><a href="#">Separated link</a></li>
            </ul>
          </li>
          <li><Link to="/users/:id/cart/products">Cart</Link></li>
        </ul>

        <ul className="nav navbar-nav navbar-right">
          <li className="active">{user ? <WhoAmI/> : <Login/>}</li>
          <button><Link to="/Signup">Signup</Link></button>
        </ul>
      </div>
    </div>
  </nav>
)

import {connect} from 'react-redux'

export default connect(
  ({ auth }) => ({ user: auth })
)(Navbar)
