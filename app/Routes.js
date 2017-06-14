import React from 'react'
import { connect } from 'react-redux'
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router'

import Root from './components/Root'
import Signup from './components/Signup'
import Login from './components/Login'

import NotFound from './components/NotFound'
import AllProductsContainer from './components/AllProducts/react/AllProductsContainer'
import ProductContainer from './components/AllProducts/react/ProductContainer'
import ManageCartContainer from './components/ManageCart/react/ManageCartContainer'
import OrderContainer from './components/Order/react/OrderContainer'
import ThankYouContainer from './components/Order/react/ThankYouContainer'

import { retrieveItems, getCart } from './components/ManageCart/reducers/reducer'
import { fetchAllProducts, fetchProduct, fetchReviews } from './components/AllProducts/reducers/products'

const Routes = props => (
    <Router history={browserHistory}>
      <Route path="/" component={Root}>
        <IndexRedirect to="/products" />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/products" component={AllProductsContainer} onEnter={props.loadProductsAndUserCart} />
        <Route path="/products/:id" component={ProductContainer} onEnter={props.loadProductAndReviews} />
        <Route path="/cart/products" component={ManageCartContainer} onEnter={props.loadCartItems} />
        <Route path="/order" component={OrderContainer} onEnter={props.loadCheckout} />
        <Route path="/thankyou" component={ThankYouContainer} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
)

const mapDispatch = dispatch => ({
  loadProductsAndUserCart: () => {
    dispatch(retrieveItems())
    dispatch(fetchAllProducts())
  },

  loadCartItems: () => {
    dispatch(retrieveItems())
  },
  loadProductAndReviews: (nextRouterState) => {
    dispatch(fetchProduct(nextRouterState.params.id))
    dispatch(fetchReviews(nextRouterState.params.id))
  },
  loadCheckout: () => {
    dispatch(retrieveItems())
  }
})

export default connect(null, mapDispatch)(Routes)
