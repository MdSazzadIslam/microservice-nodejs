"use strict";
var jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../config.env" });

const verifyToken = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader)
    return res.status(403).send({ auth: false, message: "No token provided." });

  const bearer = bearerHeader.split(" ");
  const bearerToken = bearer[1];
  req.token = bearerToken;

  await jwt.verify(
    bearerToken,
    process.env.ACCESS_TOKEN_SECRET,
    function (err, decoded) {
      if (err)
        return res
          .status(500)
          .send({ success: false, message: "Failed to authenticate token." });

      req.userId = decoded.id;
      next();
    }
  );
};

module.exports = verifyToken;
