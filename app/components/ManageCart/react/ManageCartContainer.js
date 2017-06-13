import {connect} from 'react-redux'
import ManageCart from './ManageCart'
import { removeFromCart } from '../reducers/reducer'

const mapStateToProps = state => ({
  items: state.cart.items && state.cart.items.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    quantity: p.inCart.quantity,
  }))
})

function mapDispatchToProps(dispatch) {
  return {
    removeItem: function(item, cartId) {
      const action = removeFromCart(item, cartId)
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCart)
