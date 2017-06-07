import React from 'react'
import { connect } from 'react-redux'

import Login from './Login'
import WhoAmI from './WhoAmI'

const Root = ({ user, children }) => (
  <div>
    <nav>
      {user ? <WhoAmI/> : <Login/>}
    </nav>
    <div id="main" className="container-fluid">
      { children }
    </div>
  </div>
)

export default connect(
  ({ auth }) => ({ user: auth }),
  null)(Root)
