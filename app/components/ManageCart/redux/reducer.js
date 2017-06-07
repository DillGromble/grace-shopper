import { LOAD_ITEMS, ADD_ITEM, REMOVE_ITEM, UPDATE_ITEM_QUANTITY, LOGIN_ACTION } from './action-creators'

export const initialState = {
  cartItems: []
}

export default (state = initialState, action) => {
  const newState = Object.assign({}, state)
  switch (action.type) {
  case LOAD_ITEMS:
    newState.cartItems = action.items
    break
  default:
    return state
  }
  return newState
}
