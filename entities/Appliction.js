const { Schema, model } = require('mongoose');
const schema = new Schema({
  id: {
    type: String,
    required: true,
  },
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
  amount: {
    type: Number,
    required: true,
  },
  tariff: {
    type: String,
    required: false,
  },
  passwordInCore: {
    type: String,
    required: false,
  },
  paidForIt: {
    type: Boolean,
    default: false,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  hasInstallmentPlan: {
    type: Boolean,
    required: true,
  },
});

module.exports = model('Application', schema);
