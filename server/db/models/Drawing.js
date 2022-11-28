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
  status: {
    type: DataTypes.ENUM("live", "saved", "archived"),
    defaultValue: "live",
  },
});
