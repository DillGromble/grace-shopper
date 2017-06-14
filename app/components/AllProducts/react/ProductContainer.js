import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import SingleProduct from './SingleProduct'
import { addToCart } from '../../ManageCart/reducers/reducer'
import { insertReview } from '../reducers/products'

class ProductContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      subject: '',
      rating: '',
      description: ''
    }

    this.onCartAdd = this.onCartAdd.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.submitReview = this.submitReview.bind(this)
  }

  onCartAdd(evt, item) {
    evt.preventDefault()
    this.props.dispatchToCart(item)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  submitReview(evt) {
    evt.preventDefault()
    const review = Object.assign({}, this.state, {
      productId: this.props.currentProduct.id,
      userId: this.props.user.id
    })

    this.props.dispatchReview(review)
  }

  render() {
    return (
     <SingleProduct
      currentProduct={this.props.currentProduct}
      reviews={this.props.reviews}
      onCartAdd={this.onCartAdd}
      handleChange={this.handleChange}
      submitReview={this.submitReview}
      user={this.props.user}
    />
    )
  }
}

const mapStateToProps = state => ({
  currentProduct: state.products.product,
  reviews: state.products.product.reviews,
  user: state.auth
})

const mapDispatchToProps = dispatch => ({
  dispatchToCart: (item) => {
    dispatch(addToCart(item))
  },
  dispatchReview: review => {
    dispatch(insertReview(review))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer)
