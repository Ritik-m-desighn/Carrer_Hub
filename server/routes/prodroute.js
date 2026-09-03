const express=require("express");
const router=express.Router();
const { safe } = require('../middleware/authmiddleware')
const {getprod,products}=require("../controllers/prodcontroller");
router.get("/product",safe,getprod);
// router.post('/create', safe, uploadProductPhoto,products);
module.exports=router;