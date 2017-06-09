import React from 'react'
import chai, {expect} from 'chai'
import {spy} from 'sinon'
chai.use(require('chai-enzyme')())

import {shallow} from 'enzyme'

import AllProducts from './AllProductsContainer'
import { reducer, LOAD_ALL, loadAllProducts, fetchAllProducts } from '../reducers/products'

/* global describe it beforeEach */
describe('<AllProducts />', () => {
  const product = {
    name: 'Set of Ornaments',
    price: 25,
    quantity: 1,
    type: 'Home'
  }

  let root, onSubmit, onSubmitSpy
  beforeEach('render the root', () => {
    root = shallow(<AllProducts onSubmit={onSubmit}/>)
  })

  describe('▒▒▒ React tests ▒▒▒', function() {
    describe('visual content:', () => {
      xit('includes product name', () => {
        expect(root.find('span')).to.have.length(1)
        expect(root.find('span').to.text().equal(product.name))
      })

      xit('includes product price', () => {
        root.setState({ product })
        expect(root.find('p')).to.have.length(1)
        expect(root.find('p').to.text().equal(product.price))
      })

      xit('includes an image', () => {
        root.setState({ product })
        expect(root.find('p')).to.have.length(1)
        expect(root.find('p').to.text().equal(product.imageUrl))
      })

      xit('is not hardcoded', () => {
        root.setState({ product })
        const aDifferentProduct = {
          name: 'Fireworks',
          price: 50,
          quantity: 5,
          type: 'Outdoor Entertaining'
        }
        expect(root.find('span').to.have.html('<span>Fireworks</span>'))
      })

      describe('interactivity:', () => {
        // Now we build an `AllProducts` component with multiple props. Most
        // notably, we are passing a *spy* function for 'onSubmit' when a user adds an item to
        // then update the user's cart
        // Spies let us test how a function ends up being used.

        // make sure all product names are showing
        // ensures products with the same category are listed
        // ensures all products have a photo
        // check that each product has a add to cart button
        // check that onSubmit button called

        describe('onSubmit button', () => {
          let onSubmitSpy
          beforeEach('Create spy', () => {
            onSubmitSpy = spy()
          })

          xit('is called in a <form> tag', () => {
            expect(root.find('form').to.have.length(1))
            expect(onSubmitSpy).not.to.have.been.called
            root.simulate('click')
            expect(onSubmitSpy).to.have.been.called
            //eslint-disable-line
            // not only invoked, but invoked with the right arguments
            expect(onSubmitSpy).to.have.been.calledWith(product.id)
          })
        })
      })
    })
  })

  describe('▒▒▒ Redux tests ▒▒▒', function() {
    let products
    beforeEach(() => {
      products = [
      {name: 'Set of Ornaments', price: 25, quantity: 1, type: 'Home'},
      {name: 'Holiday Cookie Cutters', price: 25, quantity: 10, type: 'Home'},
      {name: 'Hammock', price: 80, quantity: 10, type: 'Outdoor Entertaining'},
      ]
    })

    describe('action creators:', () => {
      describe('`loadAllProducts`', () => {
        xit('returns a correctly formatted action', () => {
          const action = loadAllProducts()

          expect(action.type).to.equal(LOAD_ALL)
          expect(action.products).to.equal(products)
        })
      })
    })

    describe('reducers:', () => {
      let state
      beforeEach('set up a frozen state', () => {
        // nice way of ensuring reducer is pure
        state = Object.freeze({})
      })

      describe('default state', () => {
        xit('gives a null state', () => {
          expect(reducer(null), {
            type: '@@init'
          }).to.be.null
        })
      })

      describe('`loadAllProducts` action', () => {
        let action
        beforeEach(() => {
          action = loadAllProducts(products)
        })

        xit('state gets set to products', () => {
          const newState = reducer(state, action)
          expect(newState).to.equal(products)
        })

        xit('state should be new', () => {
          const newState = reducer(state, action)
          expect(newState).to.not.equal(state)
        })

        xit('random meaningless action should not affect the state', () => {
          let action
          beforeEach(() => {
            action = {type: Math.random().toString() + '-TESTING'}
          })

          it('should not affect the state', () => {
            const newState = reducer(state, action)
            expect(newState).to.equal(state)
          })
        })
      })
    })

    describe('thunked action creators:', () => {
      // not really sure how to simulate this in the front-end yet. we need to figure out how to mock axios
      describe('`fetchAllProducts:`', () => {
        xit('returns a thunk', () => {
          const thunk = fetchAllProducts()
          expect(thunk).to.be.a('function')
          expect(thunk).to.have.length(1)
        })
      })
    })
    describe('React-redux tests', () => {
      describe('`mapState`', () => {
        xit('creates a higher order function that passes state of products and cartId', () => {
          expect(products).to.equal(state.products.products)
          expect(cartId).to.equal(state.cartItems.cartId)
        })
      })
      describe('`mapDispatch`', () => {
        xit('invokes addToCart as a dispatched action in mapDispatch', () => {
          const action = loadAllProducts()

          expect(action.type).to.equal(LOAD_ALL)
          expect(action.products).to.equal(products)
        })
      })
    })
  })
})
