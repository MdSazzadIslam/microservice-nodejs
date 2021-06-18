"use strict";
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyAccessToken = require("../middlewares/verifyAccessToken");
const refreshToken = require("../middlewares/refreshToken");

router.get("/", verifyAccessToken, userController.getAll);
router.get("/:id", verifyAccessToken, userController.getById);
router.post("/login", userController.login);
router.post("/registration", userController.registration);
//router.put("/token", refreshToken, userController.activateUser);
router.delete("/delete/:id", verifyAccessToken, userController.deleteUser);
router.put("/update/:id", verifyAccessToken, userController.updateUser);
module.exports = router;
