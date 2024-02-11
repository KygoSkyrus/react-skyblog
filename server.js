const express = require("express");
const app = express();
const path = require("path")
// const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Routes
const publicRoutes = require('./routes/publicRoutes')
const adminRoutes = require('./routes/adminRoutes')


dotenv.config({ path: './env/config.env' });
// app.set("view engine", "ejs");//not needed
// app.use(cookieParser());

var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const session = require('express-session')
const MongoStore = require('connect-mongo');

app.use(session({
  // name: "keyboardcat",
  secret: 'of9578awo49y7rt9afyta',
  resave: false,
  saveUninitialized: true,
  cookie: {
      maxAge: 7200000,
      httpOnly: true,
      secure: false
  },
  store: MongoStore.create({
      mongoUrl: process.env.dbURI,
      // mongoOptions: advancedOptions
  })
  // ExpressJS implements sessions using in-memory storage. Consequently, resetting your application will also reset the in-memory sessions. thats why mongodb is used as session storage
}))
// add secure : true for prod



app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


const db = process.env.dbURI;
//useNewUrlParser flag to allow users to fall back to the old parser if they find a bug in the new parser.
//useUnifiedTopology: Set to true to opt in to using the MongoDB driver's new connection management engine. 
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('db connected');
}).catch((err) => console.log(err));


// const upload = multer({
//   dest: "./views/upload",
// });
//setting it to empty bcz with destination defined it will upload the files at that destination and also set the path of the file to that
//const upload = multer({});


app.use(publicRoutes);
app.use('/admin', adminRoutes);


//------------------------------- ADMIN -------------------------------

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`server is running at ${port}`));