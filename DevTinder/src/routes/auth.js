const express = require('express');
const authRoute = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");

const bcrypt = require("bcrypt");

authRoute.post("/signup", async (req, res) => {
   try{
    //Validate
   validateSignUpData(req);

   const {firstName,lastName,emailId,password,age,gender,photoUrl,about,skills} = req.body;
   //Encrypt password
   const passwordHash = await bcrypt.hash(password, 10);
   console.log(passwordHash);

   const user = new User(
    {
        firstName,
        lastName,
        emailId,
        password: passwordHash, // Store the hashed password
        photoUrl,
        age,
        gender,
        about,
        skills
    }
   );

    
        const savedUser = await user.save();
        const token = await savedUser.getJWT(); // Generate JWT token using the method defined in the User model
        res.cookie("token", token,{expires: new Date(Date.now()+8*3600000)});
        
        res.json({ 
            message: "User signed up",
            data: savedUser 
        });
    }
    catch(err){
        
        res.status(400).send("Error saving the user: "+ err.message);
    }
});

authRoute.post("/login", async (req, res) => {
    try{
          const { emailId, password } = req.body;
          const user = await User.findOne({ emailId: emailId });
          if (!user) {
              throw new Error("User not found");
          }
        const isPasswordValid= await user.validatePassword(password); // Validate password using the method defined in the User model
        if (isPasswordValid) {
            
            const token = await user.getJWT(); // Generate JWT token using the method defined in the User model
            res.cookie("token", token,{expires: new Date(Date.now()+8*3600000)});
            res.send(user);
        }
        else {
            throw new Error("Invalid password");
        }
    }
   catch(err){
        res.status(400).send("Error : "+ err.message);
    }
});

authRoute.post("/logout", async (req, res) => {
    try {
        res.cookie("token",null,{
            expires: new Date(Date.now()),
        }); // Clear the cookie
        res.send("Logout successful");
    } catch (err) {
        res.status(400).send("Error during logout: " + err.message);
    }
});

module.exports = authRoute;