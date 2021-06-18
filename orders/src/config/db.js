"use strict";
require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("Connection successfull");
  } catch (error) {
    console.log("Connection fail", error);
    process.exit(1);
  }
};

module.exports = connectDB;
