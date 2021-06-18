"use strict";
require("dotenv").config({ path: "../.env" });
const redis = require("redis");
const redisClient = redis.createClient(
  process.env.REDIS_PORT,
  process.env.REDIS_HOST
); //By default redis-cli connects to the server at 127.0. 0.1 and port 6379

redisClient.on("error", (err) => {
  console.log(err);
});

module.exports = redisClient;
