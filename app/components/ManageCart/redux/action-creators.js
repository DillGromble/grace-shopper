// Actions/Constants
export const LOAD_ITEMS = 'LOAD_ITEMS'
export const ADD_ITEM = 'ADD_ITEM'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY'
export const LOGIN_ACTION = 'LOGIN_ACTION'
import axios from 'axios'

// Action Creators
export const loadItems = items => ({
  type: LOAD_ITEMS,
  items
})

// Thunk action creator
export const retrieveItems = () => (dispatch) => {
  axios.get('/api/cart')
  .then(res => res.data)
  .then(cart => dispatch(loadItems(cart)))
  .catch(console.error.bind(console))
}
