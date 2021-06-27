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
const verifyToken = require("../middlewares/verifyToken");

router.get("/", getAll);
router.get("/:id", getById);
router.post("/create", verifyToken, createProduct);
router.put("/update/:id", verifyToken, updateProduct);
router.delete("/delete/:id", verifyToken, deleteProduct);

module.exports = router;
