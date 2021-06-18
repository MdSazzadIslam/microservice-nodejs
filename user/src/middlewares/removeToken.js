"use strict";
var jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });
const redisClient = require("../config/redisClient");

const removeToken = (id, token) => {
  console.log("remove token");
  redisClient.del(id.toString());
  redisClient.set("BL" + id.toString(), token);
};
module.exports = removeToken;
