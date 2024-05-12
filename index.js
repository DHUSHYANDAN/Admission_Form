var express = require("express");
const mongoose = require("mongoose")
const authRoutes = require('./routes/authRouter')
const cookieParser = require('cookie-parser');

//for conect mongodb
const dotenv = require('dotenv');
dotenv.config();

const app = express();

//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

const uri = process.env.ATLAS_URI;

mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });


app.listen(5000, () => {
  console.log("Listening on port 5000");
})

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/admission', (req, res) => res.render('admission'));
app.use(authRoutes)

// cookies
// const cookieParser = require('cookie-parser');
// app.use(cookieParser());

app.get('/set-cookies', (req, res) => {

  // res.setHeader('Set-Cookie', 'newUser=true');
  res.cookie('newuser', false);
  res.cookie('emplouser', true, { maAge: 1000 * 60 * 60 * 24, httpOnly:true });

  res.send('you got the cookies !');

});

app.get('/read-cookies', (req, res) => {
  const cookies = req.cookies;
  console.log(cookies.newuser);

  res.json(cookies);


});