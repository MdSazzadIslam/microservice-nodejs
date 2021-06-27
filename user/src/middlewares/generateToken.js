"use strict";
var jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

const generateToken = async (id) =>
  await jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1day",
  });

module.exports = generateToken;
