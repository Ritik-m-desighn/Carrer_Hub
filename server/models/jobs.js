const mongoose=require("mongoose");

const job=new mongoose.Schema({
    jobName:{
        type:String,
        required:true
    },
    date: {
  type: Date,
  default: Date.now
},
    salary:{
        type:Number,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    applicationUrl:{
        type:String,
        required:true
    },
    skills:{ type: [String], required: true },
    postBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
})
const jobModel=mongoose.model('job',job);
module.exports=jobModel;