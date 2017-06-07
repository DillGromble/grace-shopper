import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  products: require('../components/AllProducts/reducers/products').default,
})

export default rootReducer
