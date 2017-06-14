import axios from 'axios'
import {clearCart} from '../../ManageCart/reducers/reducer.js'
/* ----- ----- ----- CONSTANTS ----- ----- ----- */

const GET_ORDER = 'GET_ORDER'

/* ----- ----- ----- ACTION CREATORS ----- ----- */

const getOrder = order => ({
  type: GET_ORDER,
  order
})

/* ----- ----- ----- REDUCER ----- ----- ----- ----- */

const initialOrderState = {
  order: {},
}

const reducer = (state = initialOrderState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
  case GET_ORDER:
    newState.order = action.order
    return newState
  default:
    return state
  }
}

export default reducer

/* ----- ----- THUNK ACTION CREATORS ----- ----- */

export const createOrder = (address, email, items) =>
  dispatch => {
    console.log('MADE IT TO DISPATCH!')
    axios.post('/api/order', { address, email, items })
    .then(res => dispatch(clearCart()))
    .catch(err => console.error(`Order unsuccessful`, err))
  }
