"use strict";
const express = require("express");
const router = express.Router();
const {
  getAll,
  getById,
  login,
  registration,
  deleteUser,
  updateUser,
} = require("../controllers/userController");
const verifyAccessToken = require("../middlewares/verifyAccessToken");

router.get("/", verifyAccessToken, getAll);
router.get("/:id", verifyAccessToken, getById);
router.post("/login", login);
router.post("/registration", registration);
router.delete("/delete/:id", verifyAccessToken, deleteUser);
router.put("/update/:id", verifyAccessToken, updateUser);
module.exports = router;
