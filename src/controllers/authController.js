const bcrypt = require("bcryptjs");

const User = require("../models/User");

const RefreshToken =
require("../models/RefreshToken");

const generateAccessToken =
require("../utils/generateToken");

const generateRefreshToken =
require("../utils/generateRefreshToken");

exports.register = async (req,res)=>{

try{

const {name,email,password,phone}
= req.body;
console.log("Request Body:", req.body);
console.log("Searching email:", email);
const existingUser =
await User.findOne({email});
console.log("Found User:", existingUser);


if(existingUser){
    return res.status(400).json({
        message:"User already exists"
    });
}

const hashedPassword =
await bcrypt.hash(password,10);

const user =
await User.create({
    name,
    email,
    phone,
    password:hashedPassword
});

res.status(201).json({
    success:true,
    user
});

}
catch(error){
    res.status(500).json({
        message:error.message
    });
}
};

exports.login = async (req,res)=>{

try{

const {email,password}
= req.body;

const user =
await User.findOne({email});

if(!user){
 return res.status(400).json({
   message:"Invalid Credentials"
 });
}

const isMatch =
await bcrypt.compare(
 password,
 user.password
);

if(!isMatch){

 return res.status(400).json({
   message:"Invalid Credentials"
 });
}

const accessToken =
generateAccessToken(user);

const refreshToken =
generateRefreshToken(user);

await RefreshToken.create({
 userId:user._id,
 token:refreshToken
});

res.json({
 accessToken,
 refreshToken,
 role:user.role
});

}
catch(error){

res.status(500).json({
 message:error.message
});

}

};

exports.blockUser =
async (req,res)=>{

try{

const user =
await User.findByIdAndUpdate(

 req.params.id,

 {
  isBlocked:true
 },

 {
  new:true
 }

);

res.json({
 success:true,
 user
});

}
catch(error){

res.status(500).json({
 message:error.message
});

}

};