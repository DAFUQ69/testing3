// models/index.js
const { Sequelize } = require('sequelize');
const config = require('../config/config')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize.DataTypes);
db.Transaction = require('./transaction')(sequelize, Sequelize.DataTypes);

db.User.hasMany(db.Transaction, { foreignKey: 'userId' });
db.Transaction.belongsTo(db.User, { foreignKey: 'userId' });

module.exports = db;
