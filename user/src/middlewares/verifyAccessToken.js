"use strict";
var jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../config.env" });

async function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader)
    return res.status(403).send({ auth: false, message: "No token provided." });

  const bearer = bearerHeader.split(" ");
  const token = bearer[1];

  await jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    function (err, decoded) {
      if (err)
        return res
          .status(500)
          .send({ success: false, message: "Failed to authenticate token." });

      // if everything good, save to request for use in other routes
      req.userId = decoded.id;
      next();
    }
  );
}

module.exports = verifyToken;
