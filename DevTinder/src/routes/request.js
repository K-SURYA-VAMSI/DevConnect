const express = require('express');

const requestRoute = express.Router();
const {userAuth} = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");

requestRoute.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try{
           const fromUserId=req.user._id;
           const toUserId = req.params.toUserId;
           const status = req.params.status;

           const allowedStatus = ["ignored","interested"];
              if(!allowedStatus.includes(status)){
                throw new Error("Invalid status provided");
              }

              const toUser = await User.findById(toUserId);
                if(!toUser){
                    return res.status(404).json({
                        message: "User not found!"
                    });
                }

            const existingConnectionRequest = await ConnectionRequestModel.findOne({
                $or:[
                    { fromUserId, toUserId },
                    { fromUserId: toUserId, toUserId: fromUserId },
                ],
            });
              if(existingConnectionRequest){
                 return res.status(400).json({
                     message: "Connection request already exists between these users"
                 });
                }


           const connectionRequest = new ConnectionRequestModel({
              fromUserId,
                toUserId,
                status,
           });
            
          const data = await connectionRequest.save();
          res.json({
              message: req.user.firstName+" is"+ status+ " in"+ toUser.firstName,
              data,
          });

    }catch(err){
        res.status(400).send("Error : " + err.message);
    }
});

requestRoute.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try{
        const loggedInUser = req.user;
        const {status, requestId} = req.params;
        
        const allowedStatus = ["accepted","rejected"];
        if(!allowedStatus.includes(status)){
              return res.status(400).json({
                  message: "Invalid status provided"
              });
        }
        const connectionRequest = await ConnectionRequestModel.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested",
        });

        if(!connectionRequest){
            return res.status(404).json({
                message: "Connection request not found or already reviewed"
            });
        }

        connectionRequest.status = status;
        const data = await connectionRequest.save();

        res.json({
            message: loggedInUser.firstName + " has " + status + " the connection request",
            data,
        });







    }catch(err){
        res.status(400).send("Error : " + err.message);
    }
});


module.exports = requestRoute;