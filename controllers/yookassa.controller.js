const YooMoneyAuth = require('../auth/YooMoney.auth');

class KassaController {
  constructor() {}

  getAllPayments = async () => {
    return await YooMoneyAuth.getPaymentList({ limit: 100 });
  };

  createPayment = async (payload) => {
    return await YooMoneyAuth.createPayment(payload);
  };

  createWebhook = async () => {
    const createWebHookPayload = {
      event: 'payment.succeeded',
      url: 'https://e74b-5-144-116-218.ngrok-free.app/kassaCallback',
    };

    return await YooMoneyAuth.createWebHook(createWebHookPayload);
  };

  getWebhookList = async () => {
    return (webhooks = await YooMoneyAuth.getWebHookList());
  };

  deleteWebhook = async () => {
    return await YooMoneyAuth.deleteWebHook(
      'wh-3f1da24d-0aff-4c8f-a096-e764072df65d'
    );
  };

  getPaymentList = async () => {
    return await YooMoneyAuth.getPaymentList();
  };

  cancelPayment = async () => {
    return await YooMoneyAuth.cancelPayment(
      '2c067d49-000f-5000-9000-1e410e6b3809'
    );
  };

  capturePayment = async (paymentId, payload) => {
    return await YooMoneyAuth.capturePayment(paymentId, payload);
  };

  getPayment = async () => {
    return await YooMoneyAuth.getPayment(
      '2c067d45-000f-5000-a000-12d7d0c4865d'
    );
  };

  createRefund = async () => {
    const createRefundPayload = {
      payment_id: '2c067d45-000f-5000-a000-12d7d0c4865d',
      amount: {
        value: '1.00',
        currency: 'RUB',
      },
    };

    return await YooMoneyAuth.createRefund(createRefundPayload);
  };

  getShop = async () => {
    return await YooMoneyAuth.getShop();
  };
}

module.exports = new KassaController();
