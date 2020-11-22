const Sequelize = require("sequelize");

const sequelize = new Sequelize("survey-app", "postgres", "rehanyasin87", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
