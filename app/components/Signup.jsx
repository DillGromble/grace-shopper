import React from 'react'
import { Link } from 'react-router'

export const Signup = ({ signup }) => (
  <form onSubmit={evt => {
    evt.preventDefault()
    signup(evt.target.name.value, evt.target.email.value, evt.target.password.value)
  } }>
    <div className="buffer oauth">
    <p>
      <a
        href="api/auth/login/google"
        className="btn btn-social btn-google">
        <i className="fa fa-google" />
        <span>Sign up with Google</span>
      </a>
    </p>
  </div>
    <input name="name" placeholder="name"/>
    <input name="email" placeholder="email"/>
    <input name="password" type="password" placeholder="password"/>
    <input type="submit" value="Signup" />
    <p> Already have an account? <Link to='/login'>Login here!</Link></p>
  </form>
)

import {signup} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  state => ({}),
  {signup},
)(Signup)
