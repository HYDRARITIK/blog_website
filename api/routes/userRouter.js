const express = require('express');
const userRouter = express.Router();

userRouter.route('/')
.get((req,res)=>{
    res.send('Hello from userRouter');
})

module.exports = userRouter;