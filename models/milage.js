'use strict';
module.exports = (sequelize, DataTypes) => {
  var milage = sequelize.define('milage', {
    distance: DataTypes.STRING,
    vehicleId: DataTypes.INTEGER
  }, {});
  milage.associate = function(models) {

    models.milage.belongsTo(models.vehicle);
    // associations can be defined here
  };
  return milage;
};
