import chai from 'chai'
import chaiProperties from 'chai-properties'
import chaiThings from 'chai-things'
chai.use(chaiProperties)
chai.use(chaiThings)
import sinon from 'sinon'

const db = require('APP/db')
const Cart = db.model('cart')

const express = require('express')
const request = require('supertest')

/* global describe it beforeEach afterEach before */

describe.only('loading express', () => {
  var server
  before('Await database sync', () => db.didSync)
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  beforeEach(() => {
    server = request(require('./start'))
  })

  it('responds to /:id', (done) => {

    server
      .get('/api/cart/1')
      .set('Accept', 'application/json')
      .expect((res) => {
        console.log('get stuff')
      })
      .expect(201, done)
  })
})
