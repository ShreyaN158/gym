const Workout =
require("../models/Workout");

exports.createWorkout =
async (req,res)=>{

try{

const workout =
await Workout.create({

 trainer:req.user.id,

 member:req.body.member,

 exercises:req.body.exercises,

 schedule:req.body.schedule,

 difficulty:req.body.difficulty

});

res.status(201).json({
 success:true,
 workout
});

}
catch(error){

res.status(500).json({
 message:error.message
});

}

};