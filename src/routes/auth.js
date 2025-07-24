const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { CheckValidations } = require("../utils/validation");

authRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, emailId, password } = req.body;
  try {
    CheckValidations(req.body);
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    const token = jwt.sign({ _id: user._id }, "DevTinder@123");

      //send the token by wrapping it in cookie
      res.cookie("token", token).send({message:"Saved successfully", data:user});
  } catch (err) {
    res.status(400).send("Error in adding user:" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  try {
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentialss");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentialsss");
    } else {
      //create a jwt token with private data and secret key
      const token = jwt.sign({ _id: user._id }, "DevTinder@123");

      //send the token by wrapping it in cookie
      res.cookie("token", token).send(user);
    }
  } catch (err) {
    res.status(400).send("Error in logging:" + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });
    res.send("User logged out successfully");
  } catch (err) {
    res.status(400).send("Somehting went wrong");
  }
});

module.exports = authRouter;
