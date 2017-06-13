import axios from 'axios'

/* -------------------------------ACTIONS------------------------------------ */

const LOAD_ALL = 'LOAD_ALL_PRODUCTS'
const LOAD_PRODUCT = 'LOAD_PRODUCT'
const LOAD_REVIEWS = 'LOAD_REVIEWS'
const ADD_REVIEW = 'ADD_REVIEW'

/* ---------------------------ACTION CREATORS-------------------------------- */

const loadAllProducts = products => ({ type: LOAD_ALL, products })
const loadProduct = product => ({ type: LOAD_PRODUCT, product })
const loadReviews = reviews => ({ type: LOAD_REVIEWS, reviews })
const addReview = review => ({ type: ADD_REVIEW, review })

/* -------------------------------REDUCER------------------------------------ */
const initialState = {
  products: [],
  product: {}
}

const reducer = (state = initialState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
  case LOAD_ALL:
    newState.products = action.products
    break
  case LOAD_PRODUCT:
    newState.product = action.product
    break
  case LOAD_REVIEWS:
    newState.product.reviews = action.reviews
    break
  case ADD_REVIEW:
    newState.product.reviews = [...newState.product.reviews, action.review]
    break
  default:
    return state
  }
  return newState
}

/* --------------------------------THUNKS------------------------------------ */

export const fetchAllProducts = () => dispatch => {
  axios.get('/api/products')
  .then(res => dispatch(loadAllProducts(res.data)))
  .catch(err => console.error(err))
}

export const fetchProduct = productId =>
  dispatch => {
    axios.get(`/api/products/${productId}`)
    .then(res => res.data)
    .then(product => dispatch(loadProduct(product)))
    .catch(err => console.error(err))
  }

export const fetchReviews = productId =>
  dispatch => {
    axios.get(`/api/products/${productId}/reviews`)
    .then(res => res.data)
    .then( reviews => dispatch(loadReviews(reviews)))
    .catch(err => console.error(err))
  }

export const insertReview = (review) =>
  dispatch => {
    axios.post(`/api/products/${review.productId}/reviews`, review)
    .then(res => res.data)
    .then( review => dispatch(addReview(review)))
    .catch(err => console.error(err))
  }

export default reducer
