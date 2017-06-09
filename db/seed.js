'use strict'

const db = require('APP/db')
    , {User, Thing, Favorite, Order, Products, Holiday, Promise} = db
    , {mapValues} = require('lodash')

function seedEverything() {
  const seeded = {
    users: users(),
    things: things(),
    orders: orders(),
    holiday: holidays(),
    products: products()
  }

  seeded.favorites = favorites(seeded)

  return Promise.props(seeded)
}

const users = seed(User, {
  god: {
    email: 'god@example.com',
    name: 'So many names',
    password: '1234',
  },
  barack: {
    name: 'Barack Obama',
    email: 'barack@example.gov',
    password: '1234'
  },
  cindy: {
    name: 'Cindy',
    email: 'cindy@cindy.com',
    password: '1234'
  },
  jen: {
    name: 'Jen',
    email: 'jen@jen.com',
    password: '1234'
  },
  alice: {
    name: 'Alice',
    email: 'alice@alice.com',
    password: '1234'
  },
  dennis: {
    name: 'Dennis',
    email: 'dennis@dennis.com',
    password: '1234'
  }
})

const products = seed(Products, {
  christmasTree: {name: 'Christmas Tree', price: 100, type: 'Home'},
  stockings: {name: 'Holiday Stocking', price: 10, type: 'Home'},
  wreath: {name: 'Wreath', price: 20, type: 'Home'},
  wrappingPaper: {name: 'Wrapping Paper', price: 10, type: 'Home'},
  uglySweater: {name: 'Ugly Sweater', price: 50, type: 'Clothing'},
  bananaCostume: {name: 'Banana Costume', price: 50, type: 'Clothing'},
  astronautCostume: {name: 'Astronaut Costume', price: 50, type: 'Clothing'},
  Grill: {name: 'Char-Broil Gas Grill', price: 100, type: 'Outdoor Entertaining'},
  iceCreamMaker: {name: 'Ice Cream Maker', price: 50, type: 'Outdoor Entertaining'},
  inflatableTurtle: {name: 'Inflatable Turtle', price: 10, type: 'Outdoor Entertaining'},
})

const holidays = seed(Holiday, {
  christmas: { name: 'Christmas' },
  thanksgiving: { name: 'Thanksgiving' },
  halloween: { name: 'Halloween' },
  easter: { name: 'Easter' },
  new_years: { name: 'New Years' },
  july4: { name: 'Fourth of July' }
})

const orders = seed(Order, {
  testOrder: {
    address: '123 Street',
    status: 'Processing',
    items: [{
      product: 'Christmas Ugly Sweater',
      price: 20,
      quantity: 3
    }, {
      product: 'Halloween Pumpkin',
      price: 5,
      quantity: 1
    }]
  }
})

const things = seed(Thing, {
  surfing: {name: 'surfing'},
  smiting: {name: 'smiting'},
  puppies: {name: 'puppies'},
})

const favorites = seed(Favorite,
  // We're specifying a function here, rather than just a rows object.
  // Using a function lets us receive the previously-seeded rows (the seed
  // function does this wiring for us).
  //
  // This lets us reference previously-created rows in order to create the join
  // rows. We can reference them by the names we used above (which is why we used
  // Objects above, rather than just arrays).
  ({users, things}) => ({
    // The easiest way to seed associations seems to be to just create rows
    // in the join table.
    'obama loves surfing': {
      user_id: users.barack.id,    // users.barack is an instance of the User model
                                   // that we created in the user seed above.
                                   // The seed function wires the promises so that it'll
                                   // have been created already.
      thing_id: things.surfing.id  // Same thing for things.
    },
    'god is into smiting': {
      user_id: users.god.id,
      thing_id: things.smiting.id
    },
    'obama loves puppies': {
      user_id: users.barack.id,
      thing_id: things.puppies.id
    },
    'god loves puppies': {
      user_id: users.god.id,
      thing_id: things.puppies.id
    },
  })
)

if (module === require.main) {
  db.didSync
    .then(() => db.sync({force: true}))
    .then(seedEverything)
    .finally(() => process.exit(0))
}

class BadRow extends Error {
  constructor(key, row, error) {
    super(error)
    this.cause = error
    this.row = row
    this.key = key
  }

  toString() {
    return `[${this.key}] ${this.cause} while creating ${JSON.stringify(this.row, 0, 2)}`
  }
}

// seed(Model: Sequelize.Model, rows: Function|Object) ->
//   (others?: {...Function|Object}) -> Promise<Seeded>
//
// Takes a model and either an Object describing rows to insert,
// or a function that when called, returns rows to insert. returns
// a function that will seed the DB when called and resolve with
// a Promise of the object of all seeded rows.
//
// The function form can be used to initialize rows that reference
// other models.
function seed(Model, rows) {
  return (others={}) => {
    if (typeof rows === 'function') {
      rows = Promise.props(
        mapValues(others,
          other =>
            // Is other a function? If so, call it. Otherwise, leave it alone.
            typeof other === 'function' ? other() : other)
      ).then(rows)
    }

    return Promise.resolve(rows)
      .then(rows => Promise.props(
        Object.keys(rows)
          .map(key => {
            const row = rows[key]
            return {
              key,
              value: Promise.props(row)
                .then(row => Model.create(row)
                  .catch(error => { throw new BadRow(key, row, error) })
                )
            }
          }).reduce(
            (all, one) => Object.assign({}, all, {[one.key]: one.value}),
            {}
          )
        )
      )
      .then(seeded => {
        console.log(`Seeded ${Object.keys(seeded).length} ${Model.name} OK`)
        return seeded
      }).catch(error => {
        console.error(`Error seeding ${Model.name}: ${error} \n${error.stack}`)
      })
  }
}

module.exports = Object.assign(seed, {users, things, orders, favorites})
