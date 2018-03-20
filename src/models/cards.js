var mongoose = require('mongoose'),
  Schema = mongoose.Schema

var cardsSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [String],
  attachments: [String],
  status: { type: Number, min: 0, max: 5, default: 0 },
  karigor_id: String,
  issue_data: { type: Date, default: new Date() },
  occupy_date: Date,
  allocated_time: String,
  points: { type: Number, min: 1, max: 10 },
  comments: [
    {
      karigor_id: String,
      body: { type: String, required: true },
      time: { type: Date, default: new Date() }
    }
  ]
})

module.exports = mongoose.model('cards', cardsSchema)