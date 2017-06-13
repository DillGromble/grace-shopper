import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { addToCart } from '../../ManageCart/reducers/reducer'
import AllProducts from './AllProducts'

class AllProductsContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      inputValue: ''
    }

    this.onCartAdd = this.onCartAdd.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt) {
    this.setState({
      inputValue: evt.target.value
    })
  }

  onCartAdd(evt, item) {
    evt.preventDefault()
    this.props.dispatchToCart(item)
  }

  render() {
    const searchVal = this.state.inputValue
    const filteredItems = this.props.products.filter( item => item.name.match(searchVal))

    return (
      <div>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            onChange={ this.handleChange }
          />
        </div>
        <AllProducts
          products={ filteredItems }
          onSubmit={ this.onCartAdd }
        />
      </div>
    )
  }
}

const mapState = state => ({
  products: state.products.products
})

const mapDispatch = dispatch => ({
  dispatchToCart: (item) => {
    dispatch(addToCart(item))
  }
})

export default connect(mapState, mapDispatch)(AllProductsContainer)
