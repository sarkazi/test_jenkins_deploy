const express = require('express');
const router = express.Router();
const { RandomHash } = require('random-hash');

const YooKassaController = require('../controllers/yookassa.controller');
const CoreAppController = require('../controllers/coreapp.controller');
const PurchaseController = require('../controllers/purchase.controller');
const ApplicationController = require('../controllers/application.controller');

const determiningCoreAppCourse = require('../utils/determiningCoreAppCourse');

router.post('/webhook', async (req, res, next) => {
  try {
    const reqWebhook = req.body;

    console.log(reqWebhook, 'Новый вебхук от yookassa');

    if (reqWebhook.event === 'payment.succeeded') {
      const paymentId = reqWebhook.object.id;

      const purchase = await PurchaseController.findOne(paymentId);

      if (!purchase) {
        return res.status(200).json({
          message: `The payment was made, but the information was not found in the database`,
          status: 'warning',
        });
      }

      if (purchase.status === true) {
        return res.status(200).json({
          message: `This payment is already marked in the database as successful`,
          status: 'warning',
        });
      }

      const genHash = new RandomHash();
      const password = genHash({ length: 10 });

      const application = await ApplicationController.findById(
        purchase.applicationId
      );

      if (!application) {
        console.log(
          'The application with this id was not found in the database!'
        );
      }

      const payloadForImportUser = {
        users: [
          {
            email: purchase.email,
            password: password,
            givenName: purchase.name,
          },
        ],
      };

      const importedUser = await CoreAppController.createUser(
        payloadForImportUser
      );

      console.log(importedUser, 98987879879);

      if (importedUser[0].status === 'created') {
        const objDB = {
          passwordInCore: password,
          paidForIt: true,
        };

        await ApplicationController.updateById(purchase.applicationId, objDB);

        console.log(
          'юзер добавлен в core, база данных "application" обновлена'
        );
      }

      if (importedUser[0].status === 'existing') {
        const objDB = {
          paidForIt: true,
        };

        await ApplicationController.updateById(purchase.applicationId, objDB);

        console.log(
          'юзер уже был добавлен в core в "coreapp", база данных "application" обновлена'
        );
      }

      const courseId = determiningCoreAppCourse(purchase.course.short);

      const payloadForInviteUser = {
        emails: [purchase.email],
      };

      await CoreAppController.joinUserToCourse(courseId, payloadForInviteUser);

      console.log(`юзер приглашен на курс "${purchase.course.short}"`);

      await PurchaseController.markAsPaid(paymentId);

      console.log('в базе данных поставлена отметка о покупке');

      return res.status(200).json({
        message: 'Payment information received and processed in the database',
        status: 'success',
      });
    } else {
      return res.status(200).json({
        message: `Information received from the webhook: ${reqWebhook.event}`,
        status: 'success',
      });
    }
  } catch (err) {
    console.log(err);

    console.log(err?.response?.data?.message);

    return res.status(500).json({
      message: 'Server side error',
      status: 'error',
    });
  }
});

router.post('/payment/create', async (req, res) => {
  const {
    name,
    email,
    phone,
    telegram,
    tariff,
    amount,
    applicationId,
    course: { full, short },
  } = req.body;

  if (!name || !email || !phone) {
    return res.status(200).json({
      message: 'Заполните все данные о себе!',
      status: 'warning',
    });
  }

  if (!amount || !full || !short || !applicationId) {
    return res.status(200).json({
      message: 'Недостаточно данных для оформления покупки!',
      status: 'warning',
    });
  }

  try {
    const payload = {
      amount: {
        value: amount,
        currency: 'RUB',
      },
      confirmation: {
        type: 'embedded',
      },
      capture: true,
      description: `Оплата обучающего курса «${full}»${
        tariff ? `, тариф ${tariff}` : ''
      }, `,
      receipt: {
        customer: {
          full_name: name,
          email,
          phone,
          ...(telegram && { telegram }),
        },
        items: [
          {
            description: `Оплата обучающего курса «${full}»${
              tariff ? `, тариф ${tariff}` : ''
            }, `,
            quantity: '1.00',
            amount: {
              value: amount,
              currency: 'RUB',
            },
            vat_code: '2',
            payment_mode: 'full_payment',
            payment_subject: 'commodity',
          },
        ],
      },
    };

    const resYooMoney = await YooKassaController.createPayment(payload);

    const objDB = {
      name,
      email,
      phone,
      ...(telegram && { telegram }),
      ...(tariff && { tariff }),
      yandexToken: resYooMoney.confirmation.confirmation_token,
      paymentId: resYooMoney.id,
      course: {
        full,
        short,
      },
      amount,
      applicationId,
    };

    const newPurchase = await PurchaseController.createNew(objDB);

    return res.status(200).json({
      message: 'The payment was created successfully',
      status: 'success',
      apiData: newPurchase,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Server side error',
      status: 'error',
    });
  }
});

router.post('/test', async (req, res) => {
  const test = await CoreAppController.getAllCourses();

  res.status(200).json(test);
});

module.exports = router;
