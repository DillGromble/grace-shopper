import React from 'react'
import { connect } from 'react-redux'
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router'

import Root from './components/Root'
import Jokes from './components/Jokes'
import Signup from './components/Signup'
import Login from './components/Login'

import NotFound from './components/NotFound'
import AllProducts from './components/AllProducts/react/AllProductsContainer'
import Product from './components/AllProducts/react/ProductContainer'
import ManageCartContainer from './components/ManageCart/react/ManageCartContainer'
import Checkout from './components/CheckoutCart/react/Checkout'

import { retrieveItems, getCart } from './components/ManageCart/reducers/reducer'
import { fetchAllProducts, fetchProduct } from './components/AllProducts/reducers/products'

const Routes = props => (
    <Router history={browserHistory}>
      <Route path="/" component={Root}>
        <IndexRedirect to="/jokes" />
        <Route path="/jokes" component={Jokes} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/products" component={AllProducts} onEnter={props.loadProducts} />
        <Route path="/products/:id" component={Product} onEnter={props.loadSingleProduct} />
        <Route path="/cart/products" component={ManageCartContainer} onEnter={props.loadCartItems} />
        <Route path="/:id/checkout" component={Checkout} onEnter={props.loadCheckout} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
)

const mapDispatch = dispatch => ({
  loadProducts: () => {
    dispatch(fetchAllProducts())
  },
  loadSingleProduct: (nextRouterState) => {
    dispatch(fetchProduct(nextRouterState.params.id))
  },
  loadCartItems: (nextRouterState) => {
    dispatch(retrieveItems(nextRouterState.params.id))
  },
  loadCheckout: (nextRouterState) => {
    dispatch(retrieveItems(nextRouterState.params.id))
    // dispatch user info to update info state
  }
})

export default connect(null, mapDispatch)(Routes)
