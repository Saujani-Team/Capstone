//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Drawing = require("./models/Drawing");

//associations could go here!
User.hasMany(Drawing);
Drawing.belongsTo(User);

module.exports = {
  db,
  models: {
    User,
    Drawing,
  },
};
