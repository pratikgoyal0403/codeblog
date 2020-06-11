const path = require("path");

const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

const homeRoute = require("./routes/blogs");
const adminRoute = require("./routes/admin");
const authRoute = require('./routes/auth');
const User = require("./model/users");

// const mongoConnect = require("./util/database").mongoConnect;  THIS IS REQUIRED TO CONNECT MONGO ATLAS

const MONGODB_URI = `mongodb+srv://pratik:pratikgoyal@cluster0-mlvox.mongodb.net/blogs`;

const app = express();

const store = new MongoDbStore({
    uri: MONGODB_URI,
    collection: "sessions",
  });

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(flash());
//INITIALISATION SESSIONS AND CONFIGURATION
app.use(
    session({
      secret: "my secret",
      resave: false,
      saveUninitialized: false,
      store: store,
    })
  );

app.use((req, res, next)=>{
    console.log(req.session.isAuthenticated)
    res.locals.isAuthenticated = req.session.isAuthenticated;
    next();
})

app.use((req, res, next) => {
    if(req.session.user){
        req.user = req.session.user;
        res.locals.username = req.session.user.username;
    }
    next();
});

app.use(homeRoute);

app.use("/admin", adminRoute);

app.use(authRoute);

mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    app.listen('3001', ()=>{
        console.log('connected to port 3001');
    });
}).catch(err=>console.log(err));