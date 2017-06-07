import React from 'react'
import { connect } from 'react-redux'

import Login from './Login'
import WhoAmI from './WhoAmI'
import Navbar from './Navbar'
import Footer from './Footer'

const Root = ({ user, children }) => (
  <div>
    <Navbar />
    <div id="main" className="container-fluid">
      { children }
    </div>
    <Footer />
  </div>
)

export default connect(
  ({ auth }) => ({ user: auth }),
  null)(Root)
