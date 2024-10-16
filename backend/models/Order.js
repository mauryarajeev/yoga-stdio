const mongoose = require("mongoose");
 
const OrderSchema = new mongoose.Schema({
   
  batch: {
    type: String,
    required: [true, "Please provide Batch"],
  },
  paymentStatus: {
    type : Boolean,
  },
  uid: {
    type: String,
    required: [true, "Please provide your Age (18-65)"],
   
  },
  
},{timestamps :true});

 
 

module.exports = Order = mongoose.model("orders", OrderSchema);