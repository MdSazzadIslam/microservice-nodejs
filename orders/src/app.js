const express = require("express");
const cors = require("cors");

const logger = require("morgan");
const fs = require("fs");
const path = require("path");

const orderRoute = require("./routes/orderRoute");

const app = express();
app.use(express.json());
app.use(cors());

//morgan only use for developement purpose
if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

//create a write stream(in append mode)
var accessLogStream = fs.createWriteStream(
  path.join(__dirname, "/logs/access.log"),
  { flags: "a" }
);
//setup the logger
app.use(logger("combined", { stream: accessLogStream }));

app.use("/api/order", orderRoute);

module.exports = app;
