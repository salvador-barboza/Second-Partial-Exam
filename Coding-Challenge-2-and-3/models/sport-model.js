const mongoose = require( 'mongoose' );
const uuid = require( 'uuid' );

/* Your code goes here */
const schema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  num_players: {
    type: String,
    required: true,
  }
})

const collection = mongoose.model('sports', schema)

module.exports = {
  sportExists: function(id) {
    return collection.findOne({ id }).then(d => {
      if (!d) {
        return false
      }
      return true
    })
  },
  deleteSport: function (id) {
    return collection.deleteOne({ id })
  },
  addTestData: function() {
    console.log('creating test data:')
    collection.create({
      id: uuid.v4(),
      name: 'Team',
      num_players: 5,
    }).then((createdItem) => console.log(createdItem))
  }
};
