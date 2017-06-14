import axios from 'axios'

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
    console.log('ORDER HAS BEEN GOTTEN - COMING TO YOU LIVE FROM THE REDUCER!')
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
    .then(res => dispatch(setOrder(res.data)))
    .catch(err => console.error(`Order unsuccessful`, err))
  }
