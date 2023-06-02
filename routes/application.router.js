const express = require('express');
const router = express.Router();

const { v4: createUniqueHash } = require('uuid');

const ApplicationController = require('../controllers/application.controller');

router.post('/create', async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(200).json({
        message: 'Введите все данные о себе',
        status: 'warning',
      });
    }

    const id = createUniqueHash();

    const newApplication = await ApplicationController.create({
      ...req.body,
      id,
    });

    return res.status(200).json({
      message: 'A new application has been created and saved to the database',
      status: 'success',
      apiData: {
        id: newApplication.id,
      },
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: 'Server side error',
      status: 'error',
    });
  }
});

router.get('/findOne/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({
        message: 'Missing id parameter',
        status: 'error',
      });
    }

    const application = await ApplicationController.findById(id);

    if (!application) {
      return res.status(200).json({
        message: 'Ваша заявка не найдена. Заполните форму заново!',
        status: 'warning',
      });
    }

    return res.status(200).json({
      message: 'The application was successfully found in the database',
      status: 'success',
      apiData: application,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: 'Server side error',
      status: 'error',
    });
  }
});

module.exports = router;
