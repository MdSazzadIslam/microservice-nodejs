"use strict";
const Order = require("../models/orderModel");

class OrderService {
  getAll = async (id) => {
    return await Order.find({ user: id });
  };

  getById = async (id) => {
    return await Order.findById(id);
  };

  create = async (data) => {
    return await Order(data).save();
  };

  update = async (id, data) => {
    return await Order.findOneAndUpdate({ _id: id }, { $set: data });
  };

  delete = async (id) => {
    return await Order.findByIdAndDelete({ _id: id });
  };
}
module.exports = new OrderService();
