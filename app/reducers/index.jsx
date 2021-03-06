import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  products: require('../components/AllProducts/reducers/products').default,
  cart: require('../components/ManageCart/reducers/reducer').default,
  order: require('../components/Order/reducers/order').default,
})

export default rootReducer
