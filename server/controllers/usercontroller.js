const userModel=require("../models/user");
const jobModel=require("../models/jobs");
const applicationModel=require("../models/application");
const profileModel=require("../models/profile");

const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const  mongoose  = require("mongoose");
require("dotenv").config();

const secret=process.env.JWT_SECRET;

const register=async(req,res,next)=>{
  try{
    const salt=await bcrypt.genSalt();
await userModel.create({
    "email":req.body.email,
    "password":await bcrypt.hash(req.body.password,salt),
    "role":"user"
})
  res.status(201).json("user registered succesfully");
  }
  catch(err){
    next(err);
  }
}

const jobSearch=async(req,res,next)=>{
 try{
const { skill } = req.query;
      const jobs = await jobModel.find({ skills: skill });
      res.status(200).json(jobs);
 } 
 catch(err){
next(err); }
}

const login=async(req,res,next)=>{
  try{
  const user=await userModel.findOne({email:req.body.email});
  if(await bcrypt.compare(req.body.password,user.password)){
    const token=jwt.sign({id:user._id},secret);
    res.json({token:token,id:user._id,role:user.role});
  }
  else{
    res.json("something went wrong");
  }
  }
    catch(err){
next(err);  
}
}


const profile = async (req, res, next) => {
  try {
    const existingProfile = await profileModel.findOne({
      user: req.user
    });

    if (existingProfile) {
      return res.status(409).json({
        message: "Profile already exists"
      });
    }

    const { bio, skills, location ,name } = req.body;

    if (!bio || !skills || !location) {
      return res.status(400).json({
        message: "Bio, skills and location are required"
      });
    }
    if (
      !req.files ||
      !req.files.profile ||
      !req.files.profile[0] ||
      !req.files.resume ||
      !req.files.resume[0]
    ) {
      return res.status(400).json({
        message: "Profile picture and resume are required"
      });
    }
    const skillArray = skills
      .split(",")
    await profileModel.create({
      name,
      bio,
      skills: skillArray,
      location,
      profilePicture: req.files.profile[0].filename,
      resume: req.files.resume[0].filename,
      user: req.user
    });

    res.status(201).json({
      message: "Profile created successfully"
    });

  } catch (err) {
    next(err);
  }
};


const addJob = async (req, res, next) => {
  try {
    const {
      jobName,
      salary,
      city,
      applicationUrl,
      skills,
    } = req.body;

    const job = await jobModel.create({
      jobName,
      salary,
      city,
      applicationUrl,
      skills,
      postBy: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

  
const application=async(req,res,next)=>{
  try{
  const doExist=await applicationModel.find({
    "job":req.params.id,
    "appliedBy":req.user
  })
  if(doExist.length>0){
    return res.status(409).json("you already applied for this job");
  }
  else{
    const jobExit=await jobModel.find({_id:req.params.id});
   if(jobExit.length>0){
    const job=await applicationModel.create({
    "status":"pending",
    "job":req.params.id,
    "appliedBy":req.user
  })
  return res.status(201).json("Applied succesfully")
   }
   else{
    res.status(404).json("no job exists");
   }
  }
  }
  catch(err){
next(err); 
 }
}

const yourApplications=async(req,res,next)=>{
  try{
      const applications=await applicationModel.find({
      appliedBy:req.user
     }).populate("job");
     if(applications.length>0){
      res.status(200).json(applications);
     }
     else{
      return res.status(200).json(null);
     }
      }
      catch(err){
next(err);      
}
}

const recruiterjobs = async (req, res, next) => {
  try {
    const jobs = await jobModel.find({
      postBy: req.user
    });

    if (jobs.length === 0) {
      return res.status(404).json({
        message: "You haven't created any jobs"
      });
    }

    return res.status(200).json(jobs);
  } catch (err) {
    next(err);
  }
};



const applicationUpdate = async (req, res, next) => {
  try {
    const application = await applicationModel.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    const job = await jobModel.findById(application.job);

    if (!job) {
      return res.status(404).json({
        message: "The job associated with this application does not exist",
      });
    }

    if (job.postBy != req.user) {
      return res.status(403).json({
        message: "You are not the owner of this job",
      });
    }

    const updatedApplication = await applicationModel.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status},
      { new: true }
    );

    return res.status(200).json({
      message: "Application status updated successfully",
      application: updatedApplication,
    });
  } catch (err) {
    next(err);
  }
};


const jobDelete = async (req, res, next) => {
  try {
    const job = await jobModel.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job does not exist or has already been deleted.",
      });
    }

    if (job.postBy != req.user) {
      return res.status(403).json({
        message: "This job does not belong to you. You cannot delete it.",
      });
    }

    await jobModel.findByIdAndDelete(req.params.id);

    const applications = await applicationModel.find({
      job: req.params.id,
    });

    if (applications.length > 0) {
      const deletedApplications = await applicationModel.deleteMany({
        job: req.params.id,
      });

      return res.status(200).json({
        message: "Job and all associated applications were deleted successfully.",
        deletedApplications,
      });
    }

    return res.status(200).json({
      message: "Job deleted successfully.",
    });
  } catch (err) {
    next(err);
  }
};


const applicationDelete=async(req,res,next)=>{
  try{
  const verified=await applicationModel.findById(req.params.id);
  if(verified!=null){
    if(verified.appliedBy==req.user){
const apps=await applicationModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
  message: "application deleted",
  apps
});
  }
  else{
    return res.status(403).json("this application is not yours you cant delete it");
  }
}
  else{
    return res.status(404).json("no applicationn exist the application already deleted or something");
  }
  }
  catch(err){
next(err);  }
}


const jobUpdate = async (req, res, next) => {
  try {
    const job = await jobModel.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job does not exist or has already been deleted",
      });
    }

    if (job.postBy != req.user) {
      return res.status(403).json({
        message: "This job is not yours. You cannot update it.",
      });
    }

    const updatedJob = await jobModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (err) {
    next(err);
  }
};


const getProfile = async (req, res, next) => {
  try {
    const profile = await profileModel.findOne({ user: req.user });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found"
      });
    }

    const profileData = profile.toObject();

    res.status(200).json({
      ...profileData,

      profilePicture: profile.profilePicture
        ? `process.env.render_url/uploads/${profile.profilePicture}`
        : null,

      resume: profile.resume
        ? `process.env.render_url/uploads/${profile.resume}`
        : null
    });

  } catch (err) {
    next(err);
  }
};

const jobs=async(req,res,next)=>{
  try{
const data=await jobModel.find();
res.status(200).json(data);
  }
  catch(err){
    next(err);
  }
}

const jobApplications = async (req, res, next) => {
  try {
    const applications = await applicationModel
      .find({ job: req.params.jobId })

    if (applications.length === 0) {
      return res.status(404).json({
        message: "No applications found for this job"
      });
    }

    return res.status(200).json(applications);

  } catch (err) {
    next(err);
  }
};

const getjob=async (req, res, next) => {
  try {
    const job = await jobModel
      .findById(req.params.id)

    if (job === null) {
      return res.status(404).json({
        message: "No jobs found for this job"
      });
    }

    return res.status(200).json(job);

  } catch (err) {
    next(err);
  }
};

module.exports={register,login,profile,addJob,application,yourApplications,recruiterjobs,applicationUpdate,jobDelete,jobUpdate,getProfile,jobSearch,jobs,applicationDelete,jobApplications,getjob};
