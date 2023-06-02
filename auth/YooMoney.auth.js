const { YooCheckout } = require('@a2seven/yoo-checkout');

const checkout = new YooCheckout({
  shopId: process.env.YOOKASSA_TEST_SHOP_ID,
  secretKey: process.env.YOOKASSA_TEST_SECRET_KEY,
  token: process.env.YOKASSA_TEST_OAUTH_TOKEN,
  debug: true,
});

module.exports = checkout;
