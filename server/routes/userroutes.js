const express=require("express");
const {register,login,profile,addJob,application,yourApplications,recruiterjobs, applicationUpdate,jobDelete,jobUpdate,getProfile,jobSearch,jobs,applicationDelete,jobApplications}=require("../controllers/usercontroller")
const {auth,jobAuth,errorHandle}=require("../middleware/authmiddleware");
const router=express.Router();
const multer=require("multer");
const path =require("path");
const jobModel=require("../models/jobs");
const applicationModel=require("../models/application");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

const upload = multer({ storage });


router.post("/register",(req,res,next)=>{
      register(req,res,next);
});

router.post("/login",login);


router.get("/",async(req,res)=>{
     res.json("you are at home page");
});

/// i didn't handle this in a serperate fucntion but make sure before going to frontedn do it for clean architecture 
router.get("/search",jobSearch);

router.get("/jobs",auth,jobs);


router.post("/addJobs",auth,jobAuth,addJob);

router.post("/apply/:id",auth,application);

router.get("/applications/user",auth,yourApplications);

router.get("/applications/recruiter/jobs",auth,jobAuth,recruiterjobs
);

router.put("/applications/recruiter/appicationUpdate/:id",auth,jobAuth,applicationUpdate
);

router.delete("/applications/recruiter/delete/:id",auth,jobAuth,jobDelete
);

router.delete("/applications/delete/:id",auth,applicationDelete
);

router.put("/applications/recruiter/jobUpdate/:id",auth,jobAuth,jobUpdate)

router.post("/profile",auth,upload.fields([{name:"profile"},{name:"resume"}]),profile
);

router.get("/getProfile",auth,getProfile)

router.get("/recruiter/jobApplications/:jobId",auth,jobAuth,jobApplications);


module.exports=router;