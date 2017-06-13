import {connect} from 'react-redux'
import Order from './Order'
// import { removeFromCart } from '../reducers/reducer'

const mapStateToProps = state => ({
  items: state.cart.items && state.cart.items.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    quantity: p.inCart.quantity,
  }))
})

function mapDispatchToProps(dispatch) {
  // return {
  //   clearCart: // some function
  // }
}

export default connect(mapStateToProps)(Order)
