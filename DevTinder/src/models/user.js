const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema =  new mongoose.Schema(
{ 
    firstName: {
        type: String,
        required: true,
        index: true,
        minLength: 4,
        maxLength: 50,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        unique: true,
        validate(value){
            if(validator.isEmail(value) === false){
                throw new Error("Email is not valid");
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (value.length < 8) {
                throw new Error("Password must be at least 8 characters long");
            }
        }
    },
    age: {
        type: Number,
        min:18,
    },
    gender: {
        type: String,
        enum:{
            values:["male","female","other"],
            message: '{VALUE} is not a valid gender type'
        }
    //     validate(value){
    //         if(!["male","female","other"].includes(value)){
    //             throw new Error("Gender must be valid");
    //     }
    // },
   },
    photoUrl: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Photo URL is not valid");
            }
        }
    },
    about: {
        type: String,
        default: "Hello, I'm using this app!",
    },
    skills: {

        type: [String], 
        validate(value) {
            if (value.length > 10) {
                throw new Error("You can only have a maximum of 10 skills");
            }
        }
    },
},
{
    timestamps: true, // Automatically adds createdAt and updatedAt fields
}
);

userSchema.methods.getJWT = async function(){
    const user = this; // 'this' refers to the instance of the User model
    
    const token = await jwt.sign({_id: user._id },"DEV@Tinder$11",{
        expiresIn: "7d", // Token
    });

    return token; // Return the generated token
}

userSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this; // 'this' refers to the instance of the User model
    const passwordHash = user.password; // Assuming password is stored as a hash
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, user.password);
    return isPasswordValid; // Return true if the password matches, false otherwise
}

module.exports = mongoose.model("User", userSchema);


