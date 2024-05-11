var express = require("express");
const mongoose=require("mongoose")
const reguserRouter=require('./routes/regusers')
const aduserRouter=require('./routes/adusers')
const dotenv = require('dotenv');
// const cors=require('cors');

dotenv.config();
const app=express();
app.use(express.json());
const uri=process.env.ATLAS_URI;
 


mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use('/user',reguserRouter);
app.use('/aduser',aduserRouter);

app.listen(5000,()=>{
    console.log("Listening on port 5000");
})