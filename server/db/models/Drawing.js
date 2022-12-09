const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

module.exports = db.define("drawing", {
  uuid: {
    type: DataTypes.TEXT,
  },
  userId: {
    type: DataTypes.INTEGER,
  },
  imageUrl: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM("live", "saved", "archived"),
    defaultValue: "live",
  },
  group: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
