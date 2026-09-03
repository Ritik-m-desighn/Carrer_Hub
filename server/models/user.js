const mongoose=require("mongoose");

const user=new mongoose.Schema({
     email:{
          type:String,
          required:true,
          trim:true,
          unique:true
     },
     password:{
          type:String,
          required:true
     },
     role:{
          type:String,
          required:true,
          enum:["user","admin","owner"]
     }
});
const userModel=mongoose.model("user",user);

module.exports=userModel;