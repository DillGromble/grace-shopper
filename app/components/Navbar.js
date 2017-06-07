import React, { Component } from 'react'
import { Link } from 'react-router'

const Navbar = () => (
  <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <Link to="/" className="navbar-brand">Home</Link>
      </div>

      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav">
          <li><Link to="/stuff">Stuff</Link></li>
          <li><Link to="/moreStuff">More Stuff</Link></li>
          <li><Link to="/evenMoreStuff">Even More Stuff</Link></li>
        </ul>

        <ul className="nav navbar-nav navbar-right">
          <li className="active"><a href="#">Logout</a></li>
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
        </ul>
      </div>
    </div>
  </nav>
)

export default Navbar

// <nav>
  // {user ? <WhoAmI/> : <Login/>}
// </nav>
