const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { async } = require("regenerator-runtime");
const User = require('../models/users');
const bcrypt = require('bcryptjs');
require('dotenv').config()

//@desc     Regster new User
//@route    POST /api/users/register
//@access   Public
const registerUser = asyncHandler(async(req, res) => {
    const { username, email, password} = req.body
    if(!username || !email || !password){
        res.status(400)
        throw new Error('Please provide credentials')
    }
    //Check if User already Exists
    const userExits = await User.findOne({email});
    if(userExits){
        res.status(400)
        throw new Error(`User with ${email}, already exists.`)
    }

   
    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt);
    // console.log(hashPassword)
    const user = await User.create({
        username,
        email,
        password: hashPassword
    })
    if(user){
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid User data")
    }
});

//@desc     Authenticate new User
//@route    POST /api/user/login
//@access   Public
const loginUser = asyncHandler(async(req, res) => {
   const { email, password } = req.body
if(!email || !password){
    throw new Error("Please provide your login credentials")
}
    const user = await User.findOne({email})
    if(user == null){
        res.status(400)
        throw new Error("Invalid Email")
    }
    // console.log(user)
    //Compare the user password with the hashed password on the DB
   let hashPassword = await bcrypt.compare(password, user.password)

   if(user && hashPassword){
    res.status(201).send(
        {
        _id: user.id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id)
    }
    )
   }else{
    res.status(400)
    throw new Error("Invalid Credentials")
}

})
//@desc     Get User data
//@route    GET /api/users/me
//@access   Public
const getMe = asyncHandler(async(req, res) => {
    //req.user.id is coming from the authMiddleware
   const { _id, email, username} = await User.findById(req.user.id);
   res.status(200).json({
    _id,
    username,
    email
   })
});



// Generate JWT 
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe

}