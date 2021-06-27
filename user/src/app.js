const express = require("express");
const cors = require("cors");

const logger = require("morgan");
const fs = require("fs");
const path = require("path");

const userRoute = require("./routes/userRoute");

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

process
  .on("unhandleRejection", (reason, promise) => {
    logger.error(reason, "Unhandle rejection", promise);
    logger.error(
      reason,
      new Date().toUTCString() + " unhandleRejection:",
      promise
    );
  })
  .on("uncaughtException", (err) => {
    logger.error(new Date().toUTCString() + " uncaughtException:", err);
    console.error(err.stack);
    process.exit(1);
  });

app.use("/api/user", userRoute);

module.exports = app;
