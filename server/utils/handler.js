const catchAsync=require("./catch");
exports.get=model=>catchAsync(async (req,res)=>{
        const prod= await model.find({owner:req.user.id});
         if(!prod){
            return res.json({
                status:"this user didnt create any product"
            })
        }
        res.status(201).json({
        status: "success",
        data: prod
    });
})

// exports.get=model=>catchAsync(async (req,res)=>{
//         const prod= await model.find({_id:req.params.id});
//          if(!prod){
//             return res.json({
//                 status:"this user didnt create any product"
//             })
//         }
//         res.status(201).json({
//         status: "success",
//         data: prod
//     });
// })
