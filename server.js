/* eslint-disable camelcase */
const express = require('express');
const cors = require('cors');
const Sequelize = require('sequelize');
const { getDistanceFromLatLonInKm } = require('./helpers');

const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

const queryModel = require('./models').Brewery;

app.use(cors());

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

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
    order,
  } = req.query;

  let result = {};

  // Validate inputs - Default numbers if fail coercion
  const vPage = Number(page) || 0;
  const vPerPage = Number(per_page) || 20;

  /**
   *
   * @param {Array<Results>} results Results array to be sorted
   * @param {String} sortBy Value of each result object to compare against
   * @param {*} orderBy Order of sorting 'ASC or DESC'
   * @returns {Array} Sorted results array
   */
  const sortResult = (results, sortBy, orderBy) => {
    let vSort = 'desc'; // Default sort descending

    // Validate the order parameter
    if (orderBy.toUpperCase() === 'DESC' || orderBy.toUpperCase() === 'ASC') {
      vSort = orderBy;
    }

    // Sort the results
    if (orderBy) {
      if (vSort === 'desc' || vSort === 'DESC') {
        return results.sort((a, b) => {
          const itemA = a[sortBy].toUpperCase(); // ignore upper and lowercase
          const itemB = b[sortBy].toUpperCase(); // ignore upper and lowercase
          return itemA > itemB ? -1 : 1;
        });
      }
    }

    // Default sort if there is no order provided to function
    return results.sort((a, b) => {
      const itemA = a[sortBy].toUpperCase(); // ignore upper and lowercase
      const itemB = b[sortBy].toUpperCase(); // ignore upper and lowercase
      return itemA > itemB ? 1 : -1;
    });
  };

  // Returns all breweries
  if (
    !by_city
    && !by_dist
    && !by_name
    && !by_province
    && !by_postal
    && !by_type) {
    result = await queryModel.findAll({
      offset: vPage,
      limit: vPerPage,
      attributes: { exclude: ['distance'] },
    });

    sortResult(result, 'name', order || 'asc');
  }

  // Returns breweries by city
  if (by_city) {
    result = await queryModel.findAll({
      where: {
        city: {
          [Sequelize.Op.iLike]: by_city,
        },
      },
      offset: vPage,
      limit: vPerPage,
      attributes: { exclude: ['distance'] },
    });
  }

  // Returns breweries in ascending order by geographic proximity
  if (by_dist) {
    const [lat, long] = by_dist.split(',');

    result = await queryModel.findAll({
      offset: vPage,
      limit: vPerPage,
    });

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

    sortResult(result, 'distance', order || 'asc');
  }

  // Returns breweries by given name (partial, case-insensitive)
  if (by_name) {
    result = await queryModel.findAll({
      where: {
        name: {
          [Sequelize.Op.iLike]: `%${by_name}%`,
        },
      },
      offset: vPage,
      limit: vPerPage,
      attributes: { exclude: ['distance'] },
    });

    sortResult(result, 'name', order || 'asc');
  }

  // Returns breweries by province (case-insensitive)
  if (by_province) {
    result = await queryModel.findAll({
      where: {
        province: {
          [Sequelize.Op.iLike]: `${by_province}%`,
        },
      },
      offset: vPage,
      limit: vPerPage,
      attributes: { exclude: ['distance'] },
    });
  }

  // Returns breweries by postal code (partial, case-insensitive)
  if (by_postal) {
    result = await queryModel.findAll({
      where: {
        postal_code: {
          [Sequelize.Op.iLike]: `%${by_postal}%`,
        },
      },
      offset: vPage,
      limit: vPerPage,
      attributes: { exclude: ['distance'] },
    });

    sortResult(result, 'postal_code', order || 'asc');
  }

  // Returns breweries by type (case-insensitive)
  if (by_type) {
    result = await queryModel.findAll({
      where: {
        type: {
          [Sequelize.Op.iLike]: `${by_type}`,
        },
      },
      offset: vPage,
      limit: vPerPage,
      attributes: { exclude: ['distance'] },
    });

    sortResult(result, 'type', order || 'asc');
  }

  res.json(result);
});
