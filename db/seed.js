'use strict'

const db = require('APP/db')
    , {User, Order, Products, Holiday, Reviews, Promise} = db
    , {mapValues} = require('lodash')

function seedEverything() {
  const seeded = {
    users: users(),
    orders: orders(),
    holiday: holidays(),
    products: products(),
  }

  seeded.reviews = reviews(seeded)

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
  christmasTree: {name: 'Christmas Tree', price: 100, type: 'Home', imageURL: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSBN7YSFm4FxQntrKU1ZL9KG7eVFJGTA-eLsjR3S7Os1GkuYP0vBj_6hzLXkw&usqp=CAY', description: 'Christmas Trees - The National Tree 7-Foot North Valley Spruce Hinged Tree Christmas Tree with Clear Lights has hinged branches to make it easy to set up and shape just right. Already pre-strung with 500 clear lights, it\'s just waiting for you to add your touch.'},

  stockings: {name: 'Holiday Stocking', price: 10, type: 'Home', imageURL: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR7MPkldgQdfjQgdQM5m0zX_WVthz-ZI-u9sakVYY1gi2a2FYV5jWXARadcn40&usqp=CAE', description: 'Need an extra hand this holiday season? The delightful character on our Holiday Helper Stocking is ready to make your home look a little extra festive this year.'},

  springWreath: {name: 'Faux Spring Berry 20" Wreath', price: 20, type: 'Home', imageURL: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQDRWvxci9CMZrnFpZffO_VbEeYhmIFWhunQNTRGdOMr4yHV5Ay4GEChGjI9Fk&usqp=CAE', description: 'Realistic berries in purple and blue mingle with lush - faux greenery for a handcrafted wreath you\'ll love over the mantel or displayed on your covered front door.'},

  christmasWreath: {name: 'Winter Holiday Wreath', price: 20, type: 'Home', imageURL: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTwF2vFup9Cd6b2HLhYkDVybTSLRLpb-pxa3XGCzvYlGnRrHPuXW4tYCJUegEcRLJaaUmXHTprT&usqp=CAE', description: 'Holiday Bright Lights WR24-MXORN-BOWW30 Holiday Wonderland; 24; Artificial Mixed Pine Wreath; Place Anywhere; Adorned With 30 Battery Operated Warm White Lights; Contains Red & Green Old Fashioned Mercury Ornaments That Are Also Lit; Batteries Run On Timer & Last Up To 576 Hours - 6 Hours On; 18 Hours Off & Repeat; Uses 2 D Batteries; Not Included.'},

  wrappingPaper: {name: 'Wrapping Paper', price: 10, type: 'Home', imageURL: 'https://target.scene7.com/is/image/Target/51980755?wid=520&hei=520&fmt=pjpeg', description: 'Bring the magic of Christmas under the tree with this fun Christmas wrapping paper! This value pack features three different rolls of wrapping paper; one design with flying reindeer, another with colorful snowflakes, and the third with Santa, penguins, and snowmen ice skating. Each roll is 2.5 ft. x 13.6 ft. and has 34 square feet of wrapping paper for a total of 102 square feet - plenty of wrapping paper to wrap gifts for the kids! Pair with a bright red bow or a winter character attachment for a gift presentation that looks like it came from the North Pole!'},

  uglySweater1: {name: 'Birthday Boy Ugly Sweater', price: 50, type: 'Clothing', imageURL: 'http://diyforlife.com/wp-content/uploads/2014/12/ugly-christmas-sweater-5.jpg', description: 'Ugly Christmas sweaters are making a come back.  You should only wear them to Ugly Christmas Sweater Parties though.  Any other time, they are perfectly dreadful.  This collection of holiday attire is sure to tickle your funny bone and may cause a sudden urge to plan your own Ugly Christmas Sweater Party.'},

  uglySweater2: {name: 'Youth – Star Wars Darth Vader Face Black Sweater', price: 25, type: 'Clothing', imageURL: 'http://www.uglychristmassweater.com/wp-content/uploads/2015/11/SWC-0717-HOLIDAY-VADER-552x611.jpg', description: 'Kids can have fun with the ugly sweater craze too! If you have a youngster who loves Star Wars then they’ll for sure love our ugly Star Wars Darth Vader holiday sweater.'},

  bananaCostume: {name: 'Banana Costume', price: 50, type: 'Clothing', imageURL: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS3W2TmMMZbgr6QxhVQA-m1zzes41O0j91-PqRDxkDVqZh7oewAme7ESutNGLei_P0KCIXFmS40&usqp=CAE', description: 'Is your banana costume game slipping a bit lately? (okay, maybe we\'re exaggerating a tad, but not by much) The same goes for many banana costumes. They start out perfectly yellow and shapely, but as the party goes on, it gradually loses its pep. By the end of the night, you might as well be wearing a soggy yellow bean bag chair cover. This wacky number solves that pep problem with the battery powered fan built right into it! It\'s (for lack of a better term) bananas!'},

  astronautCostume: {name: 'Astronaut Costume', price: 50, type: 'Clothing', imageURL: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSZqqRWNPxui6yKU5OjKJ2MY1b5GvARXDGuOeHMBGuC-tjh0Bd9phmumtlAEC2yTwfLfbS5aKA&usqp=CAE', description: 'Get ready for blast off in this out-of-this-world costume. This astronaut costume features a space helmet, spacesuit, and silver belt that\'s perfect for your first space walk. Explore the galaxy and you\'ll never want to come back down to Earth once you put on this spectacular costume.. Male . Available in size: Standard. astronauts, space, nasa, white, suits, galaxy'},

  Grill: {name: 'Char-Broil Gas Grill', price: 100, type: 'Outdoor Entertaining', imageURL: 'http://ace.imageg.net/graphics/product_images/pACE3-13653049enh-z7.jpg', description: '300 True Stainless Steel construction adds a higher level of sophistication to this three-burner grill. Whether you choose a built-in or freestanding model, you\'ll enjoy a perfect balance of style and functionality.'},

  iceCreamMaker: {name: 'Ice Cream Maker', price: 50, type: 'Outdoor Entertaining', imageURL: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRtoHhjB4mHTsgeAQ4716sPBEF-I2aQSGJVSIAiUiOCNS5pFMs&usqp=CAE', description: 'What\'s better than a quart of luscious homemade ice cream, sorbet or frozen yogurt? Two quarts! The fully automatic Cuisinart Pure Indulgence makes 2 quarts of your favorite frozen desserts or drinks in as little as 25 minutes. It\'s easy -- an integrated motor, double-insulated freezer bowl and automatic mixing paddle do all the work. Results are consistently smooth, cleanup is easy, and the brushed metal styling is simply sensational.'},

  inflatableTurtle: {name: 'Inflatable Turtle', price: 10, type: 'Outdoor Entertaining', imageURL: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ6NcvIxwMrdUiA2_ZsseyjzSuYFET66urw7-_zwNrdqw4RTmnbiXqfV0aV3OjZ7cG0W7zY9Dt-&usqp=CAE', description: 'Take it slow while you float on our inflatable turtle. Featuring heavy-duty side handles and safety valves, this cheerful sea creature is perfect for young swimmers.'},

  inflatablePineapple: {name: 'Inflatable Pineapple', price: 10, type: 'Outdoor Entertaining', imageURL: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRVijLgM1AxhFbSxdvR-ztoZiN_BYH1UhLjyT1lbwe722qzNIsfw2ZqX46pJU1bnV1bIs0DLRKD&usqp=CAE', description: 'Pool floats are must-haves for your luau, and this fun and festive pineapple is a fabulous way to dress up the celebration! Guests will line up for a chance to laze about on this unique raft. Give your pool party some hot Hawaiian style - check out more tropical trends at the most affordable prices around, right here on this website'},

  pool: {name: 'Above Ground Swimming Pool with Deluxe Accessory Set', price: 400, type: 'Outdoor Entertaining', imageURL: 'https://i5.walmartimages.com/asr/02a903f3-c821-4d35-af66-8bf732734c36_1.1994d7b95e4f16d6bc37da05f910bb7a.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF', description: 'Take the edge off the heat with the Summer Waves Above Ground Swimming Pool. It is quick and easy to set up. The Summer Waves above ground pool boasts an exceptionally durable construction that delivers years of reliable use, season after season. It measures in at 18\' x 48", so it is large enough for everyone to enjoy some quality family time while staying cool. This pool set includes a 1000-gallon cartridge filter pump with GFCI, cover, SureStep ladder, maintenance kit and ground cloth - everything you need for a smooth setup. Fill it with water and invite your friends for some refreshing fun in the sun.'},

  birdfeeder: {name: 'Birdfeeder', price: 400, type: 'Outdoor Entertaining', imageURL: 'http://ii.christmastreeshops.com/fcgi-bin/iipsrv.fcgi?FIF=/images/christmastreeshops/source/CTS/6107103_XXX_v1.tif&wid=2000&cvt=jpeg&_Colored%20House%20Shingle%20Roof%20Birdfeeder', description: 'This charming garden accent is for the birds. A shingled roof and colored accents bring character to our stylish birdhouse feeder.'},
})

const reviews = seed(Reviews, ({users}) => ({
  review1: {subject: 'I love this product', rating: '5', description: 'I can use this everyday!', product_id: 1, user_id: 1},

  review2: {subject: 'I need 10 of these', rating: '5', description: 'Wow!! It\'s perfect', product_id: 1, user_id: 1},

  review3: {subject: 'I\'m in love', rating: '5', description: 'This product is amazing.', product_id: 1, user_id: 1},

  review4: {subject: 'Nice stocking but...', rating: '2', description: 'I do not have a problem with the seller, just the item. The item looked like the photo except for the material. I thought it would be fuzzy like most stockings. But it was made from was made from a silky material that did not look sturdy enough to stand the tests of time.', product_id: 2, user_id: 2},

  review5: {subject: '5 stars', rating: '5', description: 'Perfect for our new son in law! Arrived very quickly and as described.', product_id: 2, user_id: 2},

  review6: {subject: 'Pleasant purchasing experience', rating: '5', description: 'The wreath looks big enough, what\'s the most important is that it makes my front door so beautiful. I am so glad that I ordered it from AmyHomie.', product_id: 3, user_id: 2},

  review7: {subject: 'Can I give it more than 5 stars?', rating: '5', description: 'High quality. Made of much enough flowers. Recommendable', product_id: 3, user_id: 2},

  review8: {subject: 'I love this product', rating: '5', description: 'I can use this everyday!', product_id: 4, user_id: 2},

  review9: {subject: 'I need 10 of these', rating: '5', description: 'Wow!! It\'s perfect', product_id: 4, user_id: 3},

  review10: {subject: 'I\'m in love', rating: '5', description: 'This product is amazing.', product_id: 4, user_id: 3},

  review11: {subject: 'I love this product', rating: '5', description: 'I can use this everyday!', product_id: 5, user_id: 3},

  review12: {subject: 'I need 10 of these', rating: '5', description: 'Wow!! It\'s perfect', product_id: 5, user_id: 4},

  review13: {subject: 'I\'m in love', rating: '5', description: 'This product is amazing.', product_id: 5, user_id: 4},

  review14: {subject: 'I love this product', rating: '5', description: 'I can use this everyday!', product_id: 6, user_id: 5},

  review15: {subject: 'I need 10 of these', rating: '5', description: 'Wow!! It\'s perfect', product_id: 6, user_id: 5},

  review16: {subject: 'I\'m in love', rating: '5', description: 'This product is amazing.', product_id: 6, user_id: 5},

  review17: {subject: 'I love this product', rating: '5', description: 'I can use this everyday!', product_id: 7, user_id: 6},

  review18: {subject: 'I need 10 of these', rating: '5', description: 'Wow!! It\'s perfect', product_id: 7, user_id: 6},

  review19: {subject: 'I\'m in love', rating: '5', description: 'This product is amazing.', product_id: 7, user_id: 6},

  review20: {subject: 'I love this product', rating: '5', description: 'I can use this everyday!', product_id: 8, user_id: 5},

  review21: {subject: 'I need 10 of these', rating: '5', description: 'Wow!! It\'s perfect', product_id: 8, user_id: 5},

  review22: {subject: 'I\'m in love', rating: '5', description: 'This product is amazing.', product_id: 8, user_id: 5},

  review23: {subject: 'I love this product', rating: '5', description: 'I can use this everyday!', product_id: 9, user_id: 4},

  review24: {subject: 'I need 10 of these', rating: '5', description: 'Wow!! It\'s perfect', product_id: 9, user_id: 5},

  review25: {subject: 'I\'m in love', rating: '5', description: 'This product is amazing.', product_id: 9, user_id: 5},

  review26: {subject: 'I love this product', rating: '5', description: 'I can use this everyday!', product_id: 10, user_id: 2},

  review27: {subject: 'I need 10 of these', rating: '5', description: 'Wow!! It\'s perfect', product_id: 10, user_id: 2},

  review28: {subject: 'I\'m in love', rating: '5', description: 'This product is amazing.', product_id: 10, user_id: 3},

  review29: {subject: 'I love this product', rating: '5', description: 'I can use this everyday!', product_id: 11, user_id: 3},

  review30: {subject: 'I need 10 of these', rating: '5', description: 'Wow!! It\'s perfect', product_id: 11, user_id: 4},

  review31: {subject: 'I\'m in love', rating: '5', description: 'This product is amazing.', product_id: 11, user_id: 4},

  review32: {subject: 'I love this product', rating: '5', description: 'I can use this everyday!', product_id: 12, user_id: 2},

  review33: {subject: 'I need 10 of these', rating: '5', description: 'Wow!! It\'s perfect', product_id: 12, user_id: 2},

  review34: {subject: 'I\'m in love', rating: '5', description: 'This product is amazing.', product_id: 12, user_id: 5},
}))

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

module.exports = Object.assign(seed, {users, orders, holidays, products, reviews})
