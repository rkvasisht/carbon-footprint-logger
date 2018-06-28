'use strict';
module.exports = (sequelize, DataTypes) => {
  var mileage = sequelize.define('mileage', {
    distance: DataTypes.STRING,
    vehicleId: DataTypes.INTEGER,
    carbon: DataTypes.STRING
  }, {});
  mileage.associate = function(models) {
    models.mileage.belongsTo(models.vehicle);
    // associations can be defined here
  };
  return mileage;
};
