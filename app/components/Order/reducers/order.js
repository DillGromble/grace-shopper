import axios from 'axios'

/* ----- THUNK ACTION CREATOR ----- */

export const createOrder = (address, email, items) =>
  dispatch => {
    console.log('MADE IT TO DISPATCH!')
    axios.post('/api/order', { address, email, items })
    .then(res => console.log(res.data))
    .catch(err => console.error(`Order unsuccessful`, err))
  }
