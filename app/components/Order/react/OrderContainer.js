import {connect} from 'react-redux'
import Order from './Order'

const mapStateToProps = state => ({
  items: state.cart.items && state.cart.items.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    quantity: p.inCart.quantity,
  }))
})

export default connect(mapStateToProps)(Order)
