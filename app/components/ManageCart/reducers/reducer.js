import axios from 'axios'

/* -------------------------------ACTIONS------------------------------------ */
const LOAD_ITEMS = 'LOAD_ITEMS'
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY'
const LOGIN_ACTION = 'LOGIN_ACTION'

/* ---------------------------ACTION CREATORS-------------------------------- */
const loadItems = items => ({type: LOAD_ITEMS, items})

const addItem = item => ({type: ADD_ITEM, item})

const removeItem = item => ({type: REMOVE_ITEM, item})

const updateItem = item => ({type: UPDATE_ITEM_QUANTITY, item})

/* -------------------STATE-------------------------------------------------- */
const initialState = {
  cartItems: []
}

/* -------------------------------REDUCER------------------------------------ */
const reducer = (state = initialState, action) => {
  const newState = Object.assign({}, state)
  switch (action.type) {
  case LOAD_ITEMS:
    newState.cartItems = action.items
    break
  case ADD_ITEM:
    newState.cartItems.push(action.item)
    break
  case REMOVE_ITEM:
    const index = newState.cartItems.findIndex(action.item)
    newState.cartItems.slice(index, 1)
    break
  default:
    return state
  }
  return newState
}

// Thunk action creator
export const retrieveItems = (id) => (dispatch) => {
  axios.get(`/api/users/${id}/cart/products`)
  .then(res => res.data)
  .then(cart => dispatch(loadItems(cart)))
  .catch(console.error.bind(console))
}

export const addToCart = (item) => (dispatch) => {
  axios.put(`/api/users/${item.user_id}/cart/products`, item)
  .then(res => dispatch(addItem(item)))
  .catch(console.error.bind(console))
}

export const removeFromCart = (item) => (dispatch) => {
  axios.put(`/api/users/${item.user_id}/cart/products`, item)
  .then(res => dispatch(removeItem(item)))
  .catch(console.error.bind(console))
}

export default reducer
