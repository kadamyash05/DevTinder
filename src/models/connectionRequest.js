const mongoose = require("mongoose");
const {Schema}= mongoose;

const connectionRequestSchema = new Schema
  ({
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },    
  { timestamps: true });
  //so here in this schema we have all the information aboutnthe connections that we send or recieve 
  // here it is important to have indexes as it will make oour query super fast and its a must to have all the fields in poper place and also maintain proper names of the fields
  // while fetching the data from the database unlike sql we dont have stored procedures instead we have inbuilt mongodb functions or methods that we can use to select insert update and delete


  connectionRequestSchema.index({fromUserId: 1, toUserId: 1})

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);
