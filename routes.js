const express=require('express');
const router=express.Router();
const multer=require('multer');

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads');
    },

    filename:(req,file,cb)=>{
        cb(null,filename=file.originalname);
    }
});

const upload=multer({
    storage:storage,
}); 

router.route('/addImage').post(upload.single('image'),(req,res)=>{
   try{
    console.log(req.file);
    
    res.json({path:req.file.filename});
   }
   catch(error){
    return res.json({error:error});
   }
});
module.exports=router;