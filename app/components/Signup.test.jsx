// import React from 'react'
// import chai, {expect} from 'chai'
// chai.use(require('chai-enzyme')())
// import {shallow} from 'enzyme'
// import {spy} from 'sinon'
// chai.use(require('sinon-chai'))

// import {Signup} from './Signup'

// /* global describe it beforeEach */
// describe('<Signup />', () => {
//   let root
//   beforeEach('render the root', () =>
//     root = shallow(<Signup/>)
//   )

//   // xit('shows a signup form', () => {
//   //   expect(root.find('input[name="name"]')).to.have.length(1)
//   //   expect(root.find('input[name="email"]')).to.have.length(1)
//   //   expect(root.find('input[name="password"]')).to.have.length(1)
//   // })

//   it('shows a password field', () => {
//     const pw = root.find('input[name="password"]')
//     expect(pw).to.have.length(1)
//     expect(pw.at(0)).to.have.attr('type').equals('password')
//   })

//   it('has a signup button', () => {
//     const submit = root.find('input[type="submit"]')
//     expect(submit).to.have.length(1)
//   })

//   describe('when submitted', () => {
//     const signup = spy()
//     const root = shallow(<Signup signup={signup}/>)
//     const submitEvent = {
//       preventDefault: spy(),
//       target: {
//         name: {value: 'Bones'},
//         email: {value: 'bones@example.com'},
//         password: {value: '12345'},
//       }
//     }

//     beforeEach('submit', () => {
//       signup.reset()
//       submitEvent.preventDefault.reset()
//       root.simulate('submit', submitEvent)
//     })

//     it('calls props.signup with credentials', () => {
//       expect(signup).to.have.been.calledWith(
//         submitEvent.target.name.value,
//         submitEvent.target.email.value,
//         submitEvent.target.password.value,
//       )
//     })

//     // it('calls preventDefault', () => {
//     //   expect(submitEvent.preventDefault).to.have.been.called
//     // })
//   })
// })
