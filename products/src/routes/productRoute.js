"use strict";
const express = require("express");
const router = express.Router();
const {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
//const verifyToken = require("../middlewares/verifyToken");

router.get("/", getAll);
router.get("/:id", getById);
router.post("/create", createProduct);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
