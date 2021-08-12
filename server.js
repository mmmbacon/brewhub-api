const express = require('express');
const cors = require('cors');
const Sequelize = require('sequelize');

const app = express();
const port = 5000;
require('dotenv').config();

const queryModel = require('./models').Brewery;

app.use(cors());

app.listen(process.env.PORT || port, () => {
  console.log('Server is listening');
});

/**
 * Endpoint for fetching all breweries
 */
app.get('/breweries/all', async (req, res) => {
  const result = await queryModel.findAll();
  res.json(result);
});

/**
 * Endpoint for fetching breweries by city
 */
app.get('/breweries/cities/:city', async (req, res) => {
  const { city } = req.params;
  const result = await queryModel.findAll({
    where: {
      city: {
        [Sequelize.Op.iLike]: city,
      },
    },
  });
  res.json(result);
});
