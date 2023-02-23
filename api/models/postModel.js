const express = require('express');
const mongoose = require('mongoose');
const userModel=require('./userModel');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
       
    },
    content: {
        type: String,
        required: true,
        trim: true,
       
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userModel'
    },

    
    image: {
        type: String,
        required: true,
        trim: true,
        default:"https://picsum.photos/200"
    },
    category:{
        type:String,
        default:""
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    likes:{
        type:Number,
        default:0
    }
   

});


const postModel = mongoose.model('postModel', PostSchema);

module.exports = postModel;
