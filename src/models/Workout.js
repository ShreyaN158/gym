const mongoose = require("mongoose");

const workoutSchema =
new mongoose.Schema({

 trainer:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User"
 },

 member:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User"
 },

 exercises:[String],

 schedule:{
  day:String,
  time:String
 },

 difficulty:{
  type:String,
  enum:[
   "beginner",
   "intermediate",
   "advanced"
  ]
 }

},{
 timestamps:true
});

module.exports =
mongoose.model(
 "Workout",
 workoutSchema
);