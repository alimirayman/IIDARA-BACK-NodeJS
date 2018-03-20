var mongoose = require('mongoose'),
  Schema = mongoose.Schema

var karigorSchema = new Schema({
  username: { type: String, required: true, unique: true, lowercase: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  role: { type: String, required: true },
  avatar: { type: String, required: true },
  level: {type: Number, min: 1, max: 10},
  is_admin: {type: Boolean, default: false}
})

module.exports = mongoose.model('karigor', karigorSchema)