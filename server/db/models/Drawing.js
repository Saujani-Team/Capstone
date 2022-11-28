const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

module.exports = db.define("drawing", {
  userId: {
    type: DataTypes.INTEGER,
  },
  imageUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    defaultValue: "live",
  },
});
