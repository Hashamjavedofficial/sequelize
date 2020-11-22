const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Survey = sequelize.define(
  "survey",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING(1234),
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Survey;
