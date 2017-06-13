import axios from 'axios'

/* -------------------------------ACTIONS------------------------------------ */
const GET_CART = 'GET_CART'
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'

/* ---------------------------ACTION CREATORS-------------------------------- */

const getCart = items => ({type: GET_CART, items})

const addItem = item => ({type: ADD_ITEM, item})

const removeItem = item => ({type: REMOVE_ITEM, item})

/* -------------------STATE-------------------------------------------------- */
const initialState = {
  items: []
}

/* -------------------------------REDUCER------------------------------------ */
const reducer = (state = initialState, action) => {
  const newState = Object.assign({}, state)
  switch (action.type) {

  case GET_CART:
    newState.items = action.items
    return newState

  case ADD_ITEM:
    const oldItems = newState.items.filter( item => item.id !== action.item.id)
    if (oldItems.length === newState.items.length) {
      newState.items = [...oldItems, action.item]
    } else {
      newState.items = newState.items.map( item =>
      item.id === action.item.id ? action.item : item)
    }
    return newState

  case REMOVE_ITEM:
    newState.items = newState.items.map( item =>
      item.id === action.item.id ? action.item : item
    )
    return newState
  }

  return state
}

// Thunk action creator
export const retrieveItems = () => (dispatch) => {
  axios.get(`/api/cart/products`)
  .then(res => res.data)
  .then(items => dispatch(getCart(items)))
  .catch(console.error.bind(console))
}

export const addToCart = (item) => (dispatch) => {
  axios.put(`/api/cart/products/add`, item)
  .then(res => dispatch(addItem(res.data)))
  .catch(console.error.bind(console))
}

export const removeFromCart = (item) => (dispatch) => {
  axios.put(`/api/cart/products/sub`, item)
  .then( res => dispatch(retrieveItems()))
  .catch(console.error.bind(console))
}

export const mergeSessionCartToUser = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
    .then( user => {
      const userId = user.data.id
      return axios.put(`/api/cart/mergeCart/${userId}`)
      .then( (newCart) => {
        dispatch(retrieveItems())
      })
    })
    .catch(console.error.bind(console))

export default reducer
