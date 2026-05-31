const Attendance =
require("../models/Attendance");

const Membership =
require("../models/Membership");

// Check In
exports.checkIn = async (req,res)=>{

try{

const membership =
await Membership.findOne({
 member:req.user.id,
 status:"active"
});

if(!membership){

 return res.status(400).json({
  message:"Membership Expired"
 });
}

const today =
new Date();

today.setHours(0,0,0,0);

const exists =
await Attendance.findOne({
 member:req.user.id,
 date:{
  $gte:today
 }
});

if(exists){

 return res.status(400).json({
  message:"Already Checked In"
 });
}

const attendance =
await Attendance.create({

 member:req.user.id,

 date:today,

 checkIn:new Date()

});

res.status(201).json({
 success:true,
 attendance
});

}
catch(error){

res.status(500).json({
 message:error.message
});

}

};

exports.checkOut = async (req,res)=>{

try{

const attendance =
await Attendance.findOne({
 member:req.user.id
})
.sort({createdAt:-1});

if(!attendance){

 return res.status(404).json({
  message:"No Check-In Found"
 });
}

attendance.checkOut =
new Date();

await attendance.save();

res.json({
 success:true,
 attendance
});

}
catch(error){

res.status(500).json({
 message:error.message
});

}

};

exports.history = async (req,res)=>{

try{

const history =
await Attendance.find({
 member:req.user.id
})
.sort({date:-1});

res.json({
 success:true,
 history
});

}
catch(error){

res.status(500).json({
 message:error.message
});

}

};