import axios from 'axios'

/* ----- THUNK ACTION CREATOR ----- */

export const createOrder = (address, email, items) =>
  dispatch =>
    axios.post('/api/order', { address, email, items })
    // NEED TO DEFINE clearCart
    .catch(err => console.error(`Order unsuccessful`, err))
