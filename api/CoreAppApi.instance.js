const axios = require('axios');

const CoreAppApiInstance = axios.create({
  baseURL: 'https://v2.coreapp.ai/api',
  params: {
    apikey: process.env.COREAPP_API_KEY,
  },
});

module.exports = CoreAppApiInstance;
