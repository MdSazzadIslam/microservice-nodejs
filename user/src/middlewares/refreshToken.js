"use strict";
var jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });
const redisClient = require("../config/redisClient");

const refreshToken = (id) => {
  const refToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_TIME,
  });

  redisClient.get(id.toString(), (err, data) => {
    if (err) throw err;
    redisClient.set(id.toString(), JSON.stringify({ token: refToken }));
  });

  return refToken;
};
module.exports = refreshToken;
