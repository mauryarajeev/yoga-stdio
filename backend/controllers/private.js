const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const Order = require("../models/Order");
//get user data
exports.getuser = async (req, res, next) => {
    try {
        const { _id, fullname, email, age , profileImg, ...other } = req.user;
        res.status(200).json({ _id, fullname,  email, age , profileImg });
    } catch (err) {
        next(err);
        
    }
};


  // choose plan user
  exports.chooseplan = async (req, res, next) => {
    const { batch ,paymentStatus , uid} = req.body;
    
    console.log(req.body.usid)
    const userId= await Order.findOne({ uid: req.body.usid }).sort({ $natural: -1 });
    console.log(userId)
    if(userId)
    {
        return res.status(200).json({userData : userId});
    }
    
    if (!userId) {
        try {
            const order = await Order.create({
               batch ,
               paymentStatus,
               uid
             });
             return res.status(200).json({ batch , paymentStatus , uid});
           }
           catch (err) {
             next(err);
           }
    }
    
    
  };