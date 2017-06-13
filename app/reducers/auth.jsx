import axios from 'axios'
import {mergeSessionCartToUser} from '../components/ManageCart/reducers/reducer'

const reducer = (state=null, action) => {
  switch (action.type) {
  case AUTHENTICATED:
    return action.user
  case CREATE:
    return action.user
  default:
    return state
  }
}

const CREATE = 'CREATE_USER'
const AUTHENTICATED = 'AUTHENTICATED'
export const authenticated = user => ({
  type: AUTHENTICATED, user
})
export const create = user => ({type: CREATE, user})

export const signup = (name, email, password) =>
  dispatch =>
    axios.post('/api/auth/signup/local',
      {name, email, password})
    .then(user => dispatch(create(user)))
    .catch(err => console.error(`Creating new account unsuccesful`, err))

export const login = (username, password) =>
  dispatch =>
    axios.post('/api/auth/login/local',
      {username, password})
      .then(() => dispatch(whoami()))
      .then(() => dispatch(mergeSessionCartToUser()))
      .catch(() => dispatch(whoami()))

export const logout = () =>
  dispatch =>
    axios.post('/api/auth/logout')
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data
        dispatch(authenticated(user))
      })
      .catch(failed => dispatch(authenticated(null)))

export default reducer
