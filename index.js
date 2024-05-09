var express = require("express");
const app=express();
const dotenv = require('dotenv');
dotenv.config();

// var bodyParser=require("body-parser")
const mongoose=require("mongoose")

// app.use(bodyParser.json())
// app.use(express.static('public'))
// app.use(bodyParser.urlencoded({
//     extended:true
// }))

const uri=process.env.ATLAS_URI;

mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// const dbconnection=mongoose.connection
// dbconnection.on('error', (err) => {
//     console.error('Error connecting to MongoDB:', err);
//   });
// dbconnection.once('open',()=>{
//     console.log("Connected to Database  successfully");
// })

// app.post("/sign_up",(req,res) => {
//     var name= req.body.Name
//     var phno=req.body.Phonenumber
//     var email=req.body.Email
//     var address=req.body.address
//     var course=req.body.select

//     var data={
//         "name":name,
//         "phno":phno,
//         "email":email,
//         "address":address,
//         "course":course
//     }
//     dbconnection.collection('fam').insertOne(data,(err,collection) => {
//         if(err){
//             throw err;

//         }
//         console.log("Record Inserted Succesfully")
//     })
//     return res.redirect('verification.html')
// })

// app.get("/",(req,res) => {
//     res.set({
//         "Allow-acces-Allow-Origin":'*'
//     })
//     return res.redirect('index.html')
//     // res.send("hio")
// });


app.listen(5000,()=>{
    console.log("Listening on port 5000");
})