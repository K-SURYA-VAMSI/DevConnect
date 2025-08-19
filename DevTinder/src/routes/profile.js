const express = require('express');

const profileRoute = express.Router();
const {userAuth} = require("../middlewares/auth");
const {validateEditProfileData} = require("../utils/validation");


profileRoute.get("/profile/view", userAuth, async (req, res) => {
    try{
    const user = req.user; // The user object is attached to the request by the userAuth middleware);
    res.send(user);
    }
    catch(err){
        res.status(400).send("Error : " + err.message);
    }
    
    
});

profileRoute.patch("/profile/edit", userAuth, async (req, res) => {
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid fields for edit");
        }
        const loggedInUser = req.user; // The user object is attached to the request by the userAuth middleware
        
        Object.keys(req.body).forEach((key) => {
            loggedInUser[key] = req.body[key]; // Update the user object with the new values
        });
        
        await loggedInUser.save(); // Save the updated user object to the database
        res.json({ message: `${loggedInUser.firstName}, your profile updated successfully`, 
            data: loggedInUser, });

    }
    catch(err){
        res.status(400).send("Error : " + err.message);
    }

});


module.exports = profileRoute;