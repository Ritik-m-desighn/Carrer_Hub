const jwt=require("jsonwebtoken");
const userModel=require("../models/user"); 
const secret="qwerty";
const auth=async(req,res,next)=>{
  try{
 const user=jwt.verify(req.headers.authorization.split(" ")[1],secret);
 if(user==null){
  return res.status(401).json("token verification failed");
 }
 const doExist = await userModel.findById(user.id);
 if(doExist!=null){
  req.user=user.id;
  next();
 }
 else{
  res.status(401).json("user not exist");
  return;
 }
  }
catch(err){
    res.status(401).json(err.message);
  }
}


const jobAuth=async(req,res,next)=>{
  try{
 const userData = await userModel.findById(req.user);
  if(userData?.role==="owner"){
    next();
  }
  else{
    res.status(403).json("you are not authorized to add jobs");
  }
  }
  catch(err){
    res.status(500).json("admin authroizatio failed");
  }
}

const errorHandle = (err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Something went wrong"
  });
};

module.exports={auth,jobAuth,errorHandle}