"use strict";
const express = require("express");
const router = express.Router();
const {
  getAll,
  getById,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", verifyToken, getAll);
router.get("/:id", verifyToken, getById);
router.post("/create", verifyToken, createOrder);
router.put("/update/:id", verifyToken, updateOrder);
router.delete("/delete/:id", verifyToken, deleteOrder);
module.exports = router;
