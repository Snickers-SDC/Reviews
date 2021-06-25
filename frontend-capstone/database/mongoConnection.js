const mongoose = require('mongoose');
const config = require('./config.js');

mongoose.connect('mongodb://localhost:27017/Reviews', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
  console.log('we are connected to the database!')
});

// mongodb schema
const characteristicsSchema = mongoose.Schema({})
const CharacteristicMigrate = mongoose.model('characteristics', characteristicsSchema)
CharacteristicMigrate.findOne(function (err, data) {
  if (err) {
    console.log('there was an issue finding one Characteristic', err);
  } else {
    console.log('characteristics', data);
  }
})

const characteristicReviewsSchema = ({})
const CharacteristicReviewMigrate = mongoose.model('characteristicreviews', characteristicReviewsSchema)
CharacteristicReviewMigrate.findOne(function (err, data) {
  if (err) {
    console.log('there was an issue finding one CharacteristicReview', err);
  } else {
    console.log('review characteristic', data);
  }
})

const photo = mongoose.Schema({})
const PhotosMigrate = mongoose.model('photos', photo)
PhotosMigrate.findOne(function (err, data) {
  if (err) {
    console.log('there was an issue finding one CharacteristicReview', err);
  } else {
    console.log('photos', data);
  }
})

const review = mongoose.Schema({})
const ReviewMigrate = mongoose.model('reviews', review)
ReviewMigrate.findOne(function (err, data) {
  if (err) {
    console.log('there was an issue finding one CharacteristicReview', err);
  } else {
    console.log('review', data);
  }
})

const meta = new mongoose.Schema({
  product_id: Number,
  ratings: mongoose.Schema.Types.Mixed,
  recommended: {
    true: Number,
    false: Number,
  },

  characteristics: {
    Size_id: Number,
    Size_runningTotalValue: Number,
    size_runningTotalVotes: Number,

    Fit_id: Number,
    Fit_runningTotalValue: Number,
    Fit_runningTotalVotes: Number,

    Comfort_id: Number,
    Comfort_runningTotalValue: Number,
    Comfort_runningTotalVotes: Number,

    Length_id: Number,
    Length_runningTotalValue: Number,
    Length_runningTotalVotes: Number,

    Width_id: Number,
    Width_runningTotalValue: Number,
    Width_runningTotalVotes: Number,

    Quality_id: Number,
    Quality_runningTotalValue: Number,
    Quality_runningTotalVotes: Number,
  },
})
const reviews = new mongoose.Schema({
  product_id: Number,
  review_id: Number,
  rating: Number,
  summary: String,
  response: String,
  recommend: Boolean,
  date: { type: Date, default: Date.now },
  reviewer_name: String,
  helpfulness: Number,
  photos: [{
    review_id: Number,
    id: Number,
    URL: String,
  }],
})