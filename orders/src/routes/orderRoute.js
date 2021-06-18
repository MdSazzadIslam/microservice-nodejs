"use strict";
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
//const verifyToken = require("../middlewares/verifyToken");

router.get("/", orderController.getAll);
router.get("/:id", orderController.getById);
router.post("/create", orderController.create);
router.put("/update/:id", orderController.update);
router.delete("/delete/:id", orderController.delete);
module.exports = router;
