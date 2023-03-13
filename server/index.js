const express = require("express");
const mongoose = require("mongoose");
let promise = require('bluebird');
const cors = require('cors')
const passport = require("passport");
const expressJwt = require("express-jwt");
const composable_middleware = require("composable-middleware");
const LocalStrategy = require("passport-local");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const auth = require('./auth');
const router = express.Router();
const User = require("./routes/usersRoute");
const Dogs = require("./routes/dogsRoute");
const {errorHandler} = require('./middleware/errorMiddleware')


require('dotenv').config()
const app = express();
app.use(cors({
  origin: 'http://localhost:9000',
  credential: true
}));
app.use(session({
  secret: 'secretcode',
  resave: true,
  saveUninitialized: true
}))

app.use(cookieParser('secretcode')); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//---------------------------- Mongoose ---------------------
//connecting to th database
const dbUrl = 'mongodb://127.0.0.1/datingApp';
// const dbUrl = `mongodb+srv://danities:${process.env.P_WORD}@cluster0.iksrsrk.mongodb.net/?retryWrites=true&w=majority`;
const dbOptions = {
  //useMonoClient: true,
  promiseLibrary: promise,
  useNewUrlParser: true,
  useUnifiedTopology: true
}
// Allowin Promise functions in Mongoose
mongoose.Promise = promise;
//Establishing Mongoose connections
const db = mongoose.connect(dbUrl, dbOptions, () => {
  try {
    console.log("Mongoose is Connected")
  } catch (error) {
    console.log(error)
  }
 
}); 


//--------------------------------Routes------------------------------------------

app.use('/api/dogs', Dogs);
app.use('/api/users', User);

//--------------------------------End of Routes------------------------------------------

//--------------------------------Middleware------------------------------------------

app.use(errorHandler)
//--------------------------------End of Middleware------------------------------------------

//---------------------------------------------------

app.listen(3000);
