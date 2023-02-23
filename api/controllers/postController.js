const express = require("express");
const postModel = require("../models/postModel");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");


module.checkLoginCookie=async(req,res,next)=>{
    try {
        const token=req.cookies.jwt;
        if(!token){
            res.status(400).json({message:"Please login first"});
        }
        else{
            const verifyUser=jwt.verify(token,process.env.SECRET_KEY);

        }
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}



module.exports.getPosts = async (req, res) => {
  try {
    const posts = await postModel.find();
    res.status(200).json(posts);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports.getPostById = async (req, res) => {
  try {
    const post = await postModel.findOne({ _id: req.params.id });
    console.log("posti s---> ",post);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.createPost = async (req, res) => {
  try {
    const { title, content, _id ,category,image} = req.body;
    if (!title || !content || !_id || !category) {
      res.status(400).json({ message: "Please fill all the fields" });
    } else {
      const post = await postModel.create({
        title: title,
        content: content,
        category:category,
        user_id: _id,
        image:image
      });
      res.status(200).json(post);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.deletePost = async (req, res) => {
  try {
    const post = await postModel.findByIdAndDelete(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
// module.exports.updatePost = async (req, res) => {
//   try {
//     //we are assuming that we are updating the title and content
//     const { title, content,category } = req.body;
//     if (!title || !content) {
//       res.status(400).json({ message: "Please fill all the fields" });
//     } else {
//       // Model.findByIdAndUpdate(id, { name: 'jason bourne' }, options, callback)
//       const post = await postModel.findByIdAndUpdate(req.params.id, {
//         title: title,
//         content: content,
        
//         category:category
//       });
//       res.status(200).json(post);
//     }
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

module.exports.updatePost = async (req, res) => {
  try {
    const obj=req.body;
    const post = await postModel.findByIdAndUpdate(req.params.id, obj);
    res.status(200).json(post);
    
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.getPostByCategory = async (req, res) => {
  try {
    //
    const category  = req.params.category;

    const posts = await postModel.find({ category });
    console.log(posts);
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
