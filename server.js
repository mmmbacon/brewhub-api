/* eslint-disable camelcase */
const express = require('express');
const cors = require('cors');
const Sequelize = require('sequelize');
const { getDistanceFromLatLonInKm } = require('./helpers');

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
// app.get('/breweries/all', async (req, res) => {
//   const result = await queryModel.findAll();
//   res.json(result);
// });

/**
 * Endpoint for fetching breweries by city
 */
app.get('/breweries', async (req, res) => {
  const {
    by_city,
    by_dist,
    by_name,
    by_province,
    by_postal,
    by_type,
    page,
    per_page,
    sort,
  } = req.query;

  let result = {};

  // Returns breweries by city
  if (by_city) {
    result = await queryModel.findAll({
      where: {
        city: {
          [Sequelize.Op.iLike]: by_city,
        },
      },
      attributes: { exclude: ['virtual_fields'] }, // general comment for now
    });
  }

  // Returns breweries in ascending order by geographic proximity
  if (by_dist) {
    const [lat, long] = by_dist.split(',');

    result = await queryModel.findAll();

    // Set our computed virtual field 'distance'
    result.map((row) => {
      const brewery = row.get();
      brewery.distance = getDistanceFromLatLonInKm(
        lat,
        long,
        brewery.latitude,
        brewery.longitude,
      );
      return brewery;
    });

    // Sort ascending
    result.sort((a, b) => a.distance - b.distance);
  }

  res.json(result);
});
