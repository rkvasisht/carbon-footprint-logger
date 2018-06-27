'use strict';
module.exports = (sequelize, DataTypes) => {
  var vehicle = sequelize.define('vehicle', {
    make: DataTypes.STRING,
    model: DataTypes.STRING,
    year: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  vehicle.associate = function(models) {
    // associations can be defined here
    models.vehicle.belongsTo(models.user);
    models.vehicle.hasMany(models.milage);
  };
  return vehicle;
};
