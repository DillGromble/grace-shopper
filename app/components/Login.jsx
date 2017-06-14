import React from 'react'

export const Login = ({ login }) => (
  <div>
    <h2 className="login-h2">
      Sign In
   </h2>

    <form className="loginForm" onSubmit={evt => {
      evt.preventDefault()
      login(evt.target.username.value, evt.target.password.value)
    } }>
      <input name="username" placeholder="email"/>
      <input name="password" type="password" placeholder="password"/>
      <input type="submit" value="Login" />
    </form>
  </div>
)

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  state => ({}),
  {login},
)(Login)
