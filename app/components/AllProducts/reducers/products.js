import axios from 'axios'

/* -------------------------------ACTIONS------------------------------------ */

const LOAD_ALL = 'LOAD_ALL_PRODUCTS'

/* ---------------------------ACTION CREATORS-------------------------------- */

const loadAllProducts = products => ({ type: LOAD_ALL, products })

/* -------------------------------REDUCER------------------------------------ */
const reducer = (state={}, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
  case LOAD_ALL:
    newState.products = action.products
    break
  }
  return newState
}

/* --------------------------------THUNKS------------------------------------ */

export const fetchAllProducts = () =>
  dispatch =>
    axios.get('/api/products')
    .then(res => dispatch(loadAllProducts(res.data)))
    .catch(err => console.error(err))

export default reducer
