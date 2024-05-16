var express = require("express");
const mongoose = require("mongoose")
const authRoutes = require('./routes/authRouter')
const adUser=require('./model/aduser')
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authmiddleware');
const { requireAdAuth, checkUser2 } = require('./middleware/adauthmiddleware');

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
app.get('*', checkUser);

app.use(authRoutes);

app.get('/', (req, res) => res.render('home'));

app.get('/about', (req, res) => res.render('about'));

app.get('/admission', requireAuth,(req, res) => res.render('admission'));

 app.get('/admission/verification',requireAdAuth, checkUser2,
  async (req,res) => {
    try {
        const adData = await adUser.find();
        res.render("verification", { adData: adData, currentUser: res.locals.user }); 
      } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      }
} 
 );


