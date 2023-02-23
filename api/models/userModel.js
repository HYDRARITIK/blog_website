const express = require('express');
const mongoose = require('mongoose');
const PostModel = require('./postModel');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
      
    },
    email: {
        type: String,
        required: true,
        trim: true,
      
    },
    password: {
        type: String,
        required: true,
      
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'postModel',
        default:[]
    }]


});

const UserModel = mongoose.model('userModel', userSchema);

module.exports = UserModel;


