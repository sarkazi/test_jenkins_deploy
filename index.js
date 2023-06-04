const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

require('dotenv').config();

const mongoose = require('mongoose');

const YooKassaRouter = require('./routes/yooKassa.router');
const ProdamusRouter = require('./routes/prodamus.router');
const ApplicationRouter = require('./routes/application.router');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(express.json({ extended: true }));

app.use('/yookassa', YooKassaRouter);
app.use('/prodamus', ProdamusRouter);
app.use('/application', ApplicationRouter);

const PORT = process.env.SERVER_PORT || 6666;

(async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_NAME}`,
      {}
    );
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
})();
