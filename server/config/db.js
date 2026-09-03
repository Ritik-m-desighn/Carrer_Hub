const mongoose=require("mongoose");
const connect=()=>{
     mongoose.connect("mongodb://localhost:27017/test").then(()=>{
        console.log("db connected succesfully");
     }).catch(()=>{
        console.log("db connection failed 🔥")
     })
}

module.exports=connect;