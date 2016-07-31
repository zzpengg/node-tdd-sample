'use strict';

module.exports = (sequelize, DataTypes) => {
  var Friend = sequelize.define('Friend', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    fbId: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
      }
    }
  });

  return Friend;
};
