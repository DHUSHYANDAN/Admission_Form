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
app.get('/contact', (req, res) => res.render('contact'));
app.get('/admission', (req, res) => res.render('admission'));
app.use(authRoutes)

