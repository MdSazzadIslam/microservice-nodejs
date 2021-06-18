"use strict";
var jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../config.env" });
const redisClient = require("../config/redisClient");

const verifyAccessToken = (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader)
      return res
        .status(403)
        .send({ auth: false, message: "No token provided." });

    const bearer = bearerHeader.split(" ");
    const token = bearer[1];

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // varify blacklisted access token.
    redisClient.get("BL_" + decoded.id.toString(), (err, data) => {
      if (err) throw err;

      if (data === token)
        return res
          .status(401)
          .json({ status: false, message: "blacklisted token." });
      next();
    });
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: "Your session is not valid.",
      data: error,
    });
  }
};

module.exports = verifyAccessToken;
