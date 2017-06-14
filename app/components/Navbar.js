import React, { Component } from 'react'
import { Link } from 'react-router'
import Login from './Login'
import WhoAmI from './WhoAmI'

const Navbar = ({user, cart}) => (
  <div>
    <div className="dom-site-header">
      <a href="/products">
      <img className="LogoImg" src="http://www.iconarchive.com/download/i99487/webalys/kameleon.pics/Party-Poppers.ico" alt="GraceShopper"/>
      Grace Shopper
      </a>
    </div>
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li><Link to="/products">All Products</Link></li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Categories <span className="caret"></span></a>
              <ul className="dropdown-menu">
                <li><a href="#">Decorations</a></li>
                <li><a href="#">Clothing</a></li>
                <li><a href="#">Home</a></li>
                <li><a href="#">Outdoor Entertaining</a></li>
                <li><a href="#">Gifts</a></li>

              </ul>
            </li>
          </ul>

          <ul className="nav navbar-nav navbar-right">

          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Sign In <span className="caret"></span></a>
            <ul className="dropdown-menu">
              <li><Link to="/login">Sign In</Link></li>
              <li><Link to="/signup">Create Account</Link></li>
              <li><Link to="/cart/products">Shopping List</Link></li>
            </ul>
          </li>

            <li className="active loginHeader">{user ? <WhoAmI/> : <Login/>}</li>
            <li><Link to="/cart/products">
              <span className="glyphicon glyphicon-shopping-cart"></span> Cart {cart.length > 0 ? `(${cart.reduce((a, b) => a + b.inCart.quantity, 0)})` : ''}
            </Link></li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
)

import {connect} from 'react-redux'

export default connect(
  ({ auth, cart }) => ({ user: auth, cart: cart.items })
)(Navbar)
