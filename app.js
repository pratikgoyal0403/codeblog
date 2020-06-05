const path = require("path");

const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const homeRoute = require("./routes/blogs");
const adminRoute = require("./routes/admin");
const User = require("./model/users");

// const mongoConnect = require("./util/database").mongoConnect;  THIS IS REQUIRED TO CONNECT MONGO ATLAS

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("5ed42f61701e23f43364e5b1")
    .then((user) => {
        req.user = user;
        next();
    })
    .catch((err) => err);
});

app.use(homeRoute);

app.use("/admin", adminRoute);


mongoose.connect('mongodb+srv://pratik:pratikgoyal@cluster0-mlvox.mongodb.net/blogs?retryWrites=true&w=majority').then(()=>{
    console.log('connected to port 3001');
    app.listen('3001', ()=>{
        console.log('server ready to go');
    });
}).catch(err=>console.log(err));