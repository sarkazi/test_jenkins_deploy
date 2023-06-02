const { Schema, model } = require('mongoose');
const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  telegram: {
    type: String,
    required: false,
  },
  tariff: {
    type: String,
    required: false,
  },
  course: {
    full: {
      type: String,
      required: true,
    },
    short: {
      type: String,
      required: true,
    },
  },
  amount: {
    type: Number,
    required: true,
  },
  applicationId: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  yandexToken: {
    type: String,
    required: false,
  },
});

module.exports = model('Purchases', schema);
