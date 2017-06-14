import axios from 'axios'

import { browserHistory, hashHistory } from 'react-router'
import {clearCart} from '../../ManageCart/reducers/reducer.js'

/* ----- ----- ----- CONSTANTS ----- ----- ----- */

const SET_ORDER = 'SET_ORDER'

/* ----- ----- ----- ACTION CREATORS ----- ----- */

const setOrder = order => ({
  type: SET_ORDER,
  order
})

/* ----- ----- ----- REDUCER ----- ----- ----- ----- */

const initialOrderState = {
  currentOrder: {},
}

const reducer = (state = initialOrderState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
  case SET_ORDER:
    newState.currentOrder = action.order
    return newState
  default:
    return state
  }
}

export default reducer

/* ----- ----- THUNK ACTION CREATORS ----- ----- */

export const createOrder = (address, email, items) =>
  dispatch => {
    console.log('MADE IT TO DISPATCH - AXIOS REQUEST IS NEXT!')
    axios.post('/api/order', { address, email, items })
    .then(res => res.data)
    .then(order => {
      dispatch(setOrder(order))
      dispatch(clearCart()
      browserHistory.push(`order/${order.id}`)
    })
    .catch(err => console.error(`Order unsuccessful`, err))
  }

export const getOrder = orderId =>
  dispatch => {
    axios.get(`/api/order/${orderId}`)
    .then(res => res.data)
    .then(order => dispatch(setOrder(order)))
    .catch(err => console.error(err))
  }
