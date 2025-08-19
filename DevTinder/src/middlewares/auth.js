const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
   try{
    const {token} = req.cookies;
    if(!token) {
        return res.status(401).send("Please Login!");
    }
    const decodedObj=await jwt.verify(token, "DEV@Tinder$11");
    const {_id} = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
        throw new Error("Unauthorized: User not found");
    }
    req.user = user; // Attach the user object to the request
    next();
  }
  catch (err){
    res.status(400).send("Error: " + err.message);
  }
};

module.exports = {
    userAuth,

};