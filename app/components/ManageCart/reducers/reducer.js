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
  cartItems: [],
}

/* -------------------------------REDUCER------------------------------------ */
const reducer = (state = initialState, action) => {
  const newState = Object.assign({}, state)
  switch (action.type) {

  case SET_CART:
    newState.id = action.id
    return newState

  case GET_CART:
    newState.currentCart = action.currentCart
    return newState

  case ADD_ITEM:
    newState.cartItems = [...newState.cartItems, action.item]
    return newState

  case REMOVE_ITEM:
    newState.currentCart.products = state.currentCart.products.filter(prod => prod !== action.item)
    return newState
  }

  return state
}

// Thunk action creator
export const setCartId = (cartId) => (dispatch) => {
  axios.get(`/api/cart/${cartId}`)
  .then(res => res.data)
  .then(cart => dispatch(setCart(cart.id)))
  .catch(console.error.bind(console))
}
export const retrieveItems = () => (dispatch) => {
  axios.get(`/api/cart/products`)
  .then(res => res.data)
  .then(cart => dispatch(getCart(cart)))
  .catch(console.error.bind(console))
}

export const addToCart = (item) => (dispatch) => {
  axios.put(`/api/cart/products/add`, item)
  .then(res => {
    // does this check need to happen if errors are thrown farther down the promise chain?
    if (res.data === 'OK') dispatch(addItem(item))
  })
  .catch(console.error.bind(console))
}

export const removeFromCart = (item) => (dispatch) => {
  axios.put(`/api/cart/products/sub`, item)
  .then( res => {
    if (res.data === 'OK') dispatch(retrieveItems())
  })
  .catch(console.error.bind(console))
}

export const mergeSessionCartToUser = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
    .then( user => {
      const userId = user.data.id
      return axios.put(`/api/cart/mergeCart/${userId}`)
      .then( () => dispatch(setCart(userId)))
    })
    .catch(console.error.bind(console))

export default reducer
