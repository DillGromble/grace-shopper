import axios from 'axios'

/* -------------------------------ACTIONS------------------------------------ */
const GET_CART = 'GET_CART'
const LOAD_ITEMS = 'LOAD_ITEMS'
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY'
const LOGIN_ACTION = 'LOGIN_ACTION'

/* ---------------------------ACTION CREATORS-------------------------------- */
const setCart = (user) => ({type: GET_CART, cartId: user.id})

const loadItems = items => ({type: LOAD_ITEMS, items})

const addItem = item => ({type: ADD_ITEM, item})

const removeItem = item => ({type: REMOVE_ITEM, item})

const updateItem = item => ({type: UPDATE_ITEM_QUANTITY, item})

/* -------------------STATE-------------------------------------------------- */
const initialState = {
  cartItems: [],
  cartId: 1 // hardcoded for testing, 0 by default
}

/* -------------------------------REDUCER------------------------------------ */
const reducer = (state = initialState, action) => {
  const newState = Object.assign({}, state)
  switch (action.type) {
  case GET_CART:
    newState.cartId = action.id
    break
  case LOAD_ITEMS:
    newState.cartItems = action.items
    break
  case ADD_ITEM:
    newState.cartItems = [...newState.cartItems, action.item]
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
export const getCart = (cartId) => (dispatch) => {
  axios.get(`/api/cart/${cartId}`)
  .then(res => res.data)
  .then(cart => dispatch(setCart(cart.id)))
  .catch(console.error.bind(console))
}
export const retrieveItems = (cartId) => (dispatch) => {
  axios.get(`/api/cart/${cartId}/products`)
  .then(res => res.data)
  .then(cart => dispatch(loadItems(cart)))
  .catch(console.error.bind(console))
}

export const addToCart = (item, cartId) => (dispatch) => {
  item.quantity++
  axios.put(`/api/cart/${cartId}/products`, item)
  .then(res => dispatch(addItem(item)))
  .catch(console.error.bind(console))
}

export const removeFromCart = (item, cartId) => (dispatch) => {
  item.quantity--
  axios.put(`/api/cart/${cartId}/products`, item)
  .then(res => dispatch(removeItem(item)))
  .catch(console.error.bind(console))
}

export default reducer
