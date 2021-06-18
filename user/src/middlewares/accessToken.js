"use strict";
var jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

const accessToken = (id) =>
  jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_TIME,
  });

module.exports = accessToken;
