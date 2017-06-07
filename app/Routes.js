import React from 'react'
import { connect } from 'react-redux'
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router'

import Root from './components/Root'
import Jokes from './components/Jokes'

import NotFound from './components/NotFound'
import AllProducts from './components/AllProducts/react/AllProductsContainer'
import ManageCart from './components/ManageCart/react/ManageCart'
import Checkout from './components/CheckoutCart/react/Checkout'

import { retrieveItems } from './components/ManageCart/redux/action-creators'
import { fetchAllProducts } from './components/AllProducts/reducers/products'

const Routes = props => (
    <Router history={browserHistory}>
      <Route path="/" component={Root}>
        <IndexRedirect to="/jokes" />
        <Route path="/jokes" component={Jokes} />
        <Route path="/products" component={AllProducts} onEnter={props.loadProducts} />
        <Route path="/cart" component={ManageCart} />
        <Route path="/checkout" component={Checkout} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
)

const mapDispatch = dispatch => ({
  loadProducts: () => {
    dispatch(fetchAllProducts())
  }
})

export default connect(null, mapDispatch)(Routes)
