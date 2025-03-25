import {Course} from '../models/course.model.js';
import { v2 as cloudinary } from 'cloudinary';
import { Purchase } from '../models/purchase.model.js';

export const createCourse= async (req,res)=>{
    const adminId=req.adminId;
    const {title, description,price}=req.body;

    try{
        if(!title || !description || !price ){
            return res.status(400).json({errors:"All fields are required"});
        }
        const {image}=req.files
        if(!req.files|| Object.keys(req.files).length===0){
            return res.staus(400).json({errors:"No files were uploaded"});
        }

        const allowedFormat=["image/png", "image/jpeg", "image/jpg"];
        if(!allowedFormat.includes(image.mimetype)){
            return res.status(400).json({errors:"Invalid file format"});
        }

        const cloud_response= await cloudinary.uploader.upload(image.tempFilePath);
        if(!cloud_response|| cloud_response.error){
            return res.status(400).json({errors:"Error uploading file to Cloudinary"});
        }
        const courseData={
            title,
            description,
            price,
            image:{
                public_id:cloud_response.public_id,
                url:cloud_response.url, 
            },
            createrId:adminId,
        };
        const course= await Course.create(courseData);
        res.json({ message: "Course created successfully", course});
    }catch(error){ 
        res.status(500).json({errors:"Error creating course"});
        console.log(error);
    }
};

export const updateCourse= async(req,res)=>{
    const adminId=req.adminId;
    const {courseId}=req.params;
    const {title, description,price, image}=req.body;
    try{
        const courseSearch= await Course.findById(courseId);
        if(!courseSearch){
            return res.status(404).json({errors:"Course not found"});
        }
        const course= await Course.findOneAndUpdate({  
            _id:courseId,
            creatorId:adminId,
        },{
            title,
            description,
            price,
            image:{
                public_id: image?.public_id,
                url: image?.url
            }
        })
        if(!course){
            return res.status(404).json({errors:"can't update, created by other admin"})
        }
        res.status(201).json({message:"Course updated successfully",course});
    }catch(error){
        res.status(500).json({errors:"Error in course updating"});
        console.log("error in course updating",error)
    }
}

export const deleteCourse= async(req,res)=>{
    const adminId=req.adminId;
    const {courseId}=req.params;
    try{
        const course= await Course.findOneAndDelete({
            _id:courseId,
            creatorId:adminId
        });
        if(!course){
            return res.status(404).json({errors:"Can't delete, created by other admin"});
        }
        res.status(200).json({message:"Course deleted successfully"});
    }catch(error){
        res.status(500).json({errors:"Error in course deleting"});
        console.log("error in course deletion",error)
    }
}

export const getCourses= async(req,res)=>{
    try{
        const courses= await Course.find({})
        res.status(201).json({courses})
    }catch(error){
        res.status(500).json({errors:"can't delete, created by another admin"});
        console.log("error in getting courses",error)
    }
}

export const courseDetails= async(req,res)=>{
    const {courseId}= req.params
    try{
        const course= await Course.findById(courseId)
        if(!course){
            return res.status(404).json({errors:"Course not found"});
        }
        res.status(200).json({course})
    }catch(error){
        res.status(500).json({errors:"Error in getting course details"});
        console.log("error in getting course details",error)
    }
}

export const buyCourses= async (req,res)=>{
    const {userId}=req;
    const {courseId}=req.params;
    try{
        const course= await Course.findById(courseId);
        if(!course){
            return res.status(404).json({errors:"Course not found"});
        }
        const existingPurchase= await Purchase.findOne({userId,courseId})
        if(existingPurchase){
            return res.status(400).json({errors:"Course already purchased"});
        }

        const newPurchase= new Purchase({
            userId,
            courseId
        })
        await newPurchase.save();
        res.status(201).json({message:"Course purchased successfully",newPurchase});
    }catch(error){     
        res.status(500).json({errors:"Error in course buying"})
        console.log("error in buying course",error)
    }
}
