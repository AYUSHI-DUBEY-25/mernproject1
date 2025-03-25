import {Admin }from "../models/admin.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import config from "../config.js";


export const signup= async (req,res)=>{
    const {firstName,lastName,email,password}=req.body;
    const adminSchema= z.object({
        firstName: z.string().min(2,{message:"First name should be atleast 2 characters long"}),
        lastName: z.string().min(2,{message:"Last name should be atleast 2 characters long"}),
        email: z.string().email(),
        password: z.string().min(6,{message:"Password should be atleast 6 characters long"}),
    })
    const validatedData= adminSchema.safeParse(req.body);
    if(!validatedData.success){
        return res.status(400).json({errors:validatedData.error.issues.map((err)=>err.message)});
    }
    
    const hashedPassword= await bcrypt.hash(password,10);

    try{
        const existingAdmin= await Admin.findOne({email:email});
    if(existingAdmin){
        return res.status(400).json({errors:"Admin already exists"});
    }
    const newAdmin= new Admin({
        firstName,
        lastName,
        email,
        password: hashedPassword,
    });
    await newAdmin.save();
    res.status(201).json({message:"Admin created successfully",newAdmin});
    }catch(error){
        res.status(500).json({errors:"Error in signup"});
        console.log("Error in signup", error);
    }
}

export const login= async (req,res)=>{
    const {email,password}= req.body
    try{
        const admin= await Admin.findOne({email:email});
        const isPasswordCorrect= await bcrypt.compare(password,admin.password);
        if(!admin || !isPasswordCorrect){
            return res.status(403).json({errors:"Invalid credentials"});
        }

        const token= jwt.sign({id:admin._id,
                }, config.JWT_ADMIN_PASSWORD,
                {expiresIn:"1d"}
            );

    const cookieOptions={
        expires: new Date(Date.now()+ 24*60*60*1000),
        httpOnly:true,
        secure : process.env.NODE_ENV === "production",
        sameSite:"Strict"
    }
        res.cookie("jwt",token,cookieOptions);
        res.status(201).json({message:"Login successful",admin, token});
    }catch(error){
        res.status(500).json({errors:"Error in login"})
        console.log("error in login", error)
    }
}

export const logout = (req, res) => {
    try {
     
      res.clearCookie("jwt");
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      res.status(500).json({ errors: "Error in logout" });
      console.log("Error in logout", error);
    }
  };
