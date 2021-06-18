"use strict";
const Product = require("../models/productModel");

class ProductService {
  getAll = async () => {
    return await Product.find({});
  };

  getById = async (id) => {
    return await Product.findById(id);
  };

  create = async (data) => {
    return await Product(data).save();
  };

  update = async (id, data) => {
    return await Product.findOneAndUpdate({ _id: id }, { $set: data });
  };

  delete = async (id) => {
    return await Product.findByIdAndDelete({ _id: id });
  };
}

module.exports = new ProductService();
