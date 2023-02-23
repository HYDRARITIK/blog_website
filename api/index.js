
const express = require('express');

const app=express();
const bodyParser = require('body-parser');
const cors = require('cors');
const connection=require('./utils/db');
connection();
const cookieParser = require('cookie-parser');
const multer = require('multer');
app.use(bodyParser.json());
app.use(cors({
    credentials: true,
}));
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/images')
    },
    filename: function (req, file, cb) {
     const _file=req.file;
      cb(null, Date.now() + '-' + _file.originalname)
    }
  })

const upload=multer({storage:storage});


app.post('/api/upload', upload.single('file'), function (req, res) {
    console.log(req.file);
    res.json({url:req.file.filename})
  })

const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');

app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);
app.use('/api/posts',postRouter);





app.listen(8000,()=>{
    console.log('Server is running on port 8000');
}

)




