const express = require("express");
const requestRouter = express.Router();
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        throw new Error("Status not valid");
      }

      if (fromUserId == toUserId) {
        throw new Error("Cannot send self requests");
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        throw new Error("User id not valid");
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res.status(400).send("Connection request already exixts");
      }

      const connectionRequests = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequests.save();
      res.send("Connection request saved successfully")
    } catch (error) {
      res.status(400).send("Error:" + error.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Status not allowed" });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested"
      })

      if(!connectionRequest){
        return res.status(400).json({message: "Connection request not found"})
      }

      connectionRequest.status = status
      const data = await connectionRequest.save()
      res.send("Connection saved successfully")
      
    } catch (error) {
        res.status(400).send("Error:" + error.message)
    }
  }
);

module.exports = requestRouter;
