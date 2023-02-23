
const express = require('express');
const authRouter = express.Router();
const {registerUser,loginUser, logoutUser} = require('../controllers/authController');


authRouter.route('/')
.get((req,res)=>{
    res.send('Hello from authRouter');
})

authRouter.route('/register')
.post(registerUser);

authRouter.route('/login')
.post(loginUser);

authRouter.route('/logout')
.get(logoutUser)


module.exports = authRouter;


