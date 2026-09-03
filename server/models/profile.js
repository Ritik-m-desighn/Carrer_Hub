const mongoose = require("mongoose");
const profile=mongoose.Schema({
  "name":{
      type:String,
      required:true
    },
    "bio":{
      type:String,
      required:true
    },
   "skills": {
  type: [String],
  required: true
},
     "location":{
      type:String,
      required:true
    },
     "profilePicture":{
      type:String,
      required:true
    },
     "resume":{
      type:String,
      required:true
    },
     user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
     }
})
const model=mongoose.model("profile",profile);
module.exports=model;
