import React from 'react'

const ManageCart = (props) => (
  <div>
    <h1>Your Cart Items:</h1>
    <div >product.name</div>
    <div >product.price</div>
    <div onChange={props.updateQuanity} >product.quanity</div>
  </div>
)

export default ManageCart

/*
 <ul>
      {props.cartItems && props.cartItems.map(cartItem => {
        return (
          <li key={ cartItem.id }> Name: {cartItem.product.name} Price: {cartItem.product.price} </li>
        )
      })
      }
    </ul>
*/
