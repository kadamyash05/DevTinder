const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://yashkadam3412:AVeevmJhwfZWO38t@namas.3rw06.mongodb.net/devTinder"
  );
};

module.exports = connectDB;



