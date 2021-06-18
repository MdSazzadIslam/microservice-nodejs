"use strict";
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
//const verifyToken = require("../middlewares/verifyToken");

router.get("/", productController.getAll);
router.get("/:id", productController.getById);
router.post("/create", productController.create);
router.put("/update/:id", productController.update);
router.delete("/delete/:id", productController.delete);

module.exports = router;
