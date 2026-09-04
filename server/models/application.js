const mongoose = require("mongoose");
const application = new mongoose.Schema({
    status:{
        type:String,
        required:true,
        enum: ["pending", "selected","rejected"]
    },
    date: {
  type: Date,
  default: Date.now
},
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"job"
    },
    appliedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
})
const applicationModel=mongoose.model("application",application);
module.exports=applicationModel;
