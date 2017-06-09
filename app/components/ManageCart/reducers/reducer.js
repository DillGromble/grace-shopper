import axios from 'axios'

/* -------------------------------ACTIONS------------------------------------ */
const SET_CART = 'SET_CART'
const GET_CART = 'GET_CART'
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY'
const LOGIN_ACTION = 'LOGIN_ACTION'

/* ---------------------------ACTION CREATORS-------------------------------- */
const setCart = (user) => ({type: SET_CART, cartId: user.id})

const getCart = currentCart => ({type: GET_CART, currentCart})

const addItem = item => ({type: ADD_ITEM, item})

const removeItem = item => ({type: REMOVE_ITEM, item})

const updateItem = item => ({type: UPDATE_ITEM_QUANTITY, item})

/* -------------------STATE-------------------------------------------------- */
const initialState = {
  currentCart: {},
}

/* -------------------------------REDUCER------------------------------------ */
const reducer = (state = initialState, action) => {
  const newState = Object.assign({}, state)
  switch (action.type) {
  case SET_CART:
    newState.id = action.id
    break
  case GET_CART:
    newState.currentCart = action.currentCart
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
export const setCartId = (cartId) => (dispatch) => {
  axios.get(`/api/cart/${cartId}`)
  .then(res => res.data)
  .then(cart => dispatch(setCart(cart.id)))
  .catch(console.error.bind(console))
}
export const retrieveItems = (cartId) => (dispatch) => {
  axios.get(`/api/cart/${cartId}/products`, cartId)
  .then(res => res.data)
  .then(cart => dispatch(getCart(cart)))
  .catch(console.error.bind(console))
}

export const addToCart = (item, cartId) => (dispatch) => {
  axios.put(`/api/cart/${cartId}/products`, item)
  .then(res => dispatch(addItem(item)))
  .catch(console.error.bind(console))
}

export const removeFromCart = (item, cartId) => (dispatch) => {
  item.amount = -1
  axios.put(`/api/cart/${cartId}/products`, item)
  .then(res => dispatch(removeItem(item)))
  .catch(console.error.bind(console))
}

export default reducer
