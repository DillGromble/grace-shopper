import {connect} from 'react-redux'
import ManageCart from './ManageCart'
import { removeFromCart } from '../reducers/reducer'

const mapStateToProps = state => ({
<<<<<<< HEAD
  items: state.cart.items && state.cart.items.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    quantity: p.inCart.quantity,
  }))
})
=======
  userName: state.cart.currentCart.user && state.cart.currentCart.user.name,
  cartId: state.cart.currentCart && state.cart.currentCart.id,
  itemsInCart: state.cart.currentCart.products && state.cart.currentCart.products.map(p => (
    {
      id: p.id,
      name: p.name,
      price: p.price,
      quantity: p.inCart.quantity,
    })
  )
})

function mapDispatchToProps(dispatch) {
  return {
    removeItem: function(item, cartId) {
      const action = removeFromCart(item, cartId)
      dispatch(action)
    }
  }
}
>>>>>>> deleteItemButton

export default connect(mapStateToProps, mapDispatchToProps)(ManageCart)
