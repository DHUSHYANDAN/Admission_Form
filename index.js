var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")

const app=express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017')
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
    return res.redirect('sign.html')
})

app.get("/",(req,res) => {
    res.set({
        "Allow-acces-Allow-Origin":'*'
    })
    return res.redirect('index.html')
}).listen(5000);



console.log("Listening on port 5000")