var express=require("express")
const app=express()
const dotenv =require('dotenv')
dotenv.config();

var bodyParser=require("body-parser")
var mongoose=require("mongoose")

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

const PORT=process.env.Port || 8000;
const Mongourl=process.env.Mongo_url;
mongoose.connect(Mongourl)


var db=mongoose.connection
db.on('error',()=> console.log("Error in Connecting to Database"))
db.once('open',()=> console.log("Connected to Database"))

app.post("/sign_up",(req,res) => {
    var name= req.body.Name
    var phno=req.body.Phonenumber
    var email=req.body.Email
    var address=req.body.address
    var course=req.body.select

    var data={
        "name":name,
        "phno":phno,
        "email":email,
        "address":address,
        "course":course
    }
    db.collection('fam').insertOne(data,(err,collection) => {
        if(err){
            throw err;

        }
        console.log("Record Inserted Succesfully")
    })
    return res.redirect('verification.html')
})

app.get("/",(req,res) => {
    res.set({
        "Allow-acces-Allow-Origin":'*'
    })
    return res.redirect('index.html')
}),app.listen(PORT);



console.log("Listening on port", `${PORT}`)