
const mongoose = require("mongoose");
const connection =async ()=>{
    const db_link="mongodb://localhost:27017/blogdb";
    //consist two collection usercolllection and postcollection
    const db=await mongoose.connect(db_link);
    console.log(" db connected");
    

}
module.exports=connection;

