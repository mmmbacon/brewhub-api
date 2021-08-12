const {
  Model,
} = require('sequelize');
const { getDistanceFromLatLonInKm } = require('../helpers');

module.exports = (sequelize, DataTypes) => {
  class Brewery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Brewery.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    street_address: DataTypes.STRING,
    province: DataTypes.STRING,
    city: DataTypes.STRING,
    postal_code: DataTypes.STRING,
    country: DataTypes.STRING,
    longitude: DataTypes.STRING,
    latitude: DataTypes.STRING,
    phone: DataTypes.STRING,
    website: DataTypes.STRING,
    description: DataTypes.STRING,
    logo_url: DataTypes.STRING,
    established: DataTypes.INTEGER,
    social1: DataTypes.STRING,
    social2: DataTypes.STRING,
    social3: DataTypes.STRING,
    distance: DataTypes.VIRTUAL,
  }, {
    sequelize,
    modelName: 'Brewery',
  });

  return Brewery;
};
