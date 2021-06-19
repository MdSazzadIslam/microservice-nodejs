"use strict";
const User = require("../models/userModel");

class UserService {
  registration = async (data) => {
    return await User(data).save();
  };

  updateUser = async (id, data) => {
    console.log(id, data);
    return await User.findByIdAndUpdate(id, { $set: data });
  };

  checkEmailExist = async (email) => {
    return await User.findOne({ email });
  };

  checkActiveStatus = async (email) => {
    return await User.findOne({ email: email, activeStatus: false });
  };

  checUserExist = async (data) => {
    const { email, password } = data;
    return await await User.findOne({ email }).select("+password");
  };

  deleteUser = async (id) => {
    return await User.findOneAndDelete(id);
  };

  getAll = async () => {
    return await User.find({});
  };

  getById = async (id) => {
    return await User.findById(id);
  };
}

module.exports = new UserService();
