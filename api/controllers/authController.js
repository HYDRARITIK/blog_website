const express=require('express');
const userModel=require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createJWT=require('../utils/jwt');
const JWT_SECRET = "jwt_key";

module.exports.registerUser= async (req,res)=>{
    try {
        const {name,email,password}=req.body;
        if(!name || !email || !password){
            res.status(400).json({message:"Please fill all the fields"});
        }
        else{
            //create user in usercollection

              //find user if alreeady exist
              const docs=await userModel.findOne({email:email})
                if(docs){
                    res.status(400).json({message:"User already exist"});
                }
                else{
                    bcrypt.hash(password, 10, async function(err, hash) {
                        // Store hash in your password DB.
        
                        const user=await userModel.create({
                            userName:name,
                            email:email,
                            password:hash});
                
                        res.status(200).json({message:"User registered successfully"});
        
                    });
                }
               
            


           
        }
    } catch (error) {
        res.status(404).json({message:error.message});
    }
   
    
}       
//

module.exports.loginUser=async (req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            res.status(400).json({message:"Please fill all the fields"});
        }
        else{
          const user=await userModel.findOne({email:email});
          if(!user){
                res.status(400).json({message:"User does not exist"});
          }
          else{
            const result =await bcrypt.compare(password, user.password);
            if(result){
                //create token
                const token=await createJWT({id:user._id});
                res.cookie("login-cookie",token,{httpOnly:true,maxAge:1000*60*60*24*7, sameSite: 'None', secure: false});
                res.status(200).json(user);
            }else{
                res.status(400).json({message:"Invalid credentials"});
            }

            

          }
        }
    } catch (error) {
        res.status(404).json({message:error.message});
    }
   

    
}

module.exports.logoutUser=async (req,res)=>{    
    res.clearCookie("login-cookie");
    res.status(200).json({message:"User logged out successfully"});
}

// module.exports.forgotPassword=async (req,res)=>{
        
// }

// module.exports.resetPassword=async (req,res)=>{
            
// }




module.exports.ProtectRoute=async (req,res,next)=>{
    try {
        const token=req.cookies["login-cookie"];
        console.log("token idddd",token);
        if(!token){
            res.status(400).json({message:"Please login first"});

        }
        else{
            const verifyUser=await jwt.verify(token,JWT_SECRET);
            if(verifyUser){
                req.user=verifyUser;
                next();
            }
            else{
                res.status(400).json({message:"Please login first"});
            }
        }
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

   
module.exports.isAuthorised=async (roles)=>{
    try {
        return (req,res,next)=>{
            if(!roles.includes(req.user.role)){
                res.status(400).json({message:"You are not authorised to access this route"});
            }
            next();
        }
        
    } catch (error) {
        console.log(error.message);
    }
}





