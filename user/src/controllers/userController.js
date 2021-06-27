"use strict";

require("dotenv").config({ path: "../.env" });
const bcrypt = require("bcrypt");
const UserService = require("../services/UserService");
const generateToken = require("../middlewares/generateToken");

const login = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.json({
        success: true,
        msg: "Please enter email and password.",
      });
    } else {
      try {
        const user = await UserService.checUserExist(req.body);
        if (user === undefined || user === null) {
          return res.status(401).send({ success: true, msg: "User not found" });
        }

        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (passwordIsValid === false)
          return res.json({
            success: true,
            msg: "Password is invalid!!!",
          });
        if (!passwordIsValid)
          return res.status(401).send({
            msg: "Password is not valid.",
            success: true,
            token: null,
          });

        //creating a token
        var token = await generateToken(user._id);
        if (user) {
          return res.json({
            success: true,
            msg: "Successfull",
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            active: user.active,
            role: user.role,
            token: token,
          });

          //  res.cookie("token", token, { maxAge: 1, httpOnly: true });
        } else {
          return res
            .status(401)
            .send({ success: false, msg: "Please check all the data" });
        }
      } catch (err) {
        return res.status(500).json({ success: false, msg: err.message });
      }
    }
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
};

const registration = async (req, res, next) => {
  debugger;

  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      res
        .status(401)
        .send({ success: true, msg: "Please fillup required field." });
    } else if (password.length < 8) {
      return res.status(401).send({
        success: true,
        msg: "Password must be at least 8 characters.",
      });
    } else {
      const userExists = await UserService.checkEmailExist(email);
      if (userExists) {
        return res
          .status(400)
          .send({ success: true, msg: "Email already exists" });
      }

      const passwordHash = await bcrypt.hash(password, 12);
      const newUser = {
        firstName,
        lastName,
        email,
        password: passwordHash,
      };

      const user = await UserService.registration(newUser);

      if (user) {
        return res.status(200).send({
          success: true,
          msg: "Register Success. Please login",
          user,
        });
      } else {
        return res
          .status(500)
          .send({ success: false, msg: "Something went wrong" });
      }
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ success: false, msg: err.message });
  }
};

const logout = (req, res, next) => {
  try {
    cookie.remove("login");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  registration,
  logout,
};
