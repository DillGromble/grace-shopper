import React from 'react'
import { connect } from 'react-redux'
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router'

import Root from './components/Root'
import Jokes from './components/Jokes'

import NotFound from './components/NotFound'
import AllProducts from './components/AllProducts/react/AllProductsContainer'
import ManageCartContainer from './components/ManageCart/react/ManageCartContainer'
import Checkout from './components/CheckoutCart/react/Checkout'

import { retrieveItems, getCart } from './components/ManageCart/reducers/reducer'
import { fetchAllProducts } from './components/AllProducts/reducers/products'

const Routes = props => (
    <Router history={browserHistory}>
      <Route path="/" component={Root}>
        <IndexRedirect to="/jokes" />
        <Route path="/jokes" component={Jokes} />
        <Route path="/products" component={AllProducts} onEnter={props.loadProducts} />
        <Route path="/cart/:id/products" component={ManageCartContainer} onEnter={props.loadCartItems} />
        <Route path="/:id/checkout" component={Checkout} onEnter={props.loadCheckout} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
)

const mapDispatch = dispatch => ({
  loadProducts: () => {
    dispatch(fetchAllProducts())
  },
  loadCartItems: (cartId) => {
    dispatch(retrieveItems(cartId.params.id))
  },
  loadCheckout: (cartId) => {
    dispatch(retrieveItems(cartId.params.id))
    // dispatch user info to update info state
  }
})

export default connect(null, mapDispatch)(Routes)
