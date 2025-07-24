const { request } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    console.log("Cookies: ", req.cookies);
    const cookies = req.cookies;

    const { token } = cookies;
    if (!token) {
      throw new Error("Token not valid!!!!");
    }
    const decodedMessage = jwt.verify(token, "DevTinder@123");
    const { _id } = decodedMessage;

    const user = await User.findOne({ _id: _id });
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("" + err);
  }
};

module.exports = { userAuth };
