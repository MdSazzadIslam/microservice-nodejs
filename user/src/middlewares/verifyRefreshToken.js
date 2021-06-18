"use strict";
var jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../config.env" });
const redisClient = require("../config/redisClient");

const verifyRefreshToken = (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader)
      return res
        .status(403)
        .send({ auth: false, message: "No token provided." });

    const bearer = bearerHeader.split(" ");
    const token = bearer[1];

    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    // verify if token is in store or not
    redisClient.get(decoded.id.toSting(), (err, data) => {
      if (err) throw err;

      if (data === null)
        return res.status(401).json({
          status: false,
          message: "Invalid request. Token is not in store.",
        });
      if (JSON.parse(data).token != token)
        return res.status(401).json({
          status: false,
          message: "Invalid request. Token is not same in store.",
        });

      next();
    });
  } catch (error) {
    return res.status(401).json({
      status: true,
      message: "Your session is not valid.",
      data: error,
    });
  }
};

module.exports = verifyRefreshToken;
