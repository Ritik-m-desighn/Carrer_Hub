const mongoose=require("mongoose");
require("dotenv").config();
const connect=()=>{
     mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log(`db connected succesfully `);
     }).catch(()=>{
        console.log("db connection failed 🔥")
     })
}

module.exports=connect;