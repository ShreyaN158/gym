const Membership = require("../models/Membership");

// Subscribe
exports.subscribe = async (req, res) => {

  try {

    const {
      planName,
      price,
      duration,
      features
    } = req.body;

    const expiryDate = new Date();

    expiryDate.setDate(
      expiryDate.getDate() + duration
    );

    const membership =
      await Membership.create({

        member: req.user.id,

        planName,

        price: {
          amount: price
        },

        duration,

        features,

        expiryDate
      });

    res.status(201).json({
      success: true,
      membership
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

exports.getMembershipStatus = async (req,res)=>{

try{

const membership =
await Membership.findOne({
 member:req.user.id
});

if(!membership){

 return res.status(404).json({
  message:"No Membership Found"
 });
}

res.json({
 success:true,
 membership
});

}
catch(error){

res.status(500).json({
 message:error.message
});

}

};


exports.renewMembership =
async (req,res)=>{

try{

const membership =
await Membership.findOne({
 member:req.user.id
});

if(!membership){

 return res.status(404).json({
  message:"Membership Not Found"
 });
}

membership.expiryDate =
new Date(
 membership.expiryDate.getTime()
 +
 membership.duration *
 24*60*60*1000
);

membership.status = "active";

await membership.save();

res.json({
 success:true,
 membership
});

}
catch(error){

res.status(500).json({
 message:error.message
});

}

};