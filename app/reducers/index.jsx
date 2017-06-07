import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  products: require('../components/AllProducts/reducers/products').default,
  cartItems: require('../components/ManageCart/reducers/reducer').default,
})

export default rootReducer
