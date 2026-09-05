const express=require("express");
const app=express();
const userroutes=require("./routes/userroutes");
const connect=require("./config/db");
const {errorHandle} = require("./middleware/authmiddleware");
const cors=require("cors");
app.use(cors());

require("dotenv").config();

app.use(express.json());
app.use("/uploads",express.static("uploads"));
app.use("/",userroutes);
app.use(errorHandle);
connect();

app.listen(process.env.PORT,()=>{
    console.log(`server is listening on ${process.env.PORT}`)
})