const Attendance =
require("../models/Attendance");

exports.monthlyReport =
async (req,res)=>{

try{

const report =
await Attendance.aggregate([

 {
  $group:{
   _id:"$member",
   totalAttendance:{
    $sum:1
   }
  }
 }

]);

res.json({
 success:true,
 report
});

}
catch(error){

res.status(500).json({
 message:error.message
});

}

};