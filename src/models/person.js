var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var PersonSchema = new Schema({
  name: String,
  email: String
})

module.exports = mongoose.model('Person', PersonSchema)