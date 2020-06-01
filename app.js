const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const homeRoute = require("./routes/blogs");
const adminRoute = require("./routes/admin");
const User = require("./model/users");

const mongoConnect = require("./util/database").mongoConnect;

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("5ed42f61701e23f43364e5b1")
    .then((user) => {
        req.user = new User(user.username, user.email, user.blogs, user._id);
        next();
    })
    .catch((err) => err);
});

app.use(homeRoute);

app.use("/admin", adminRoute);
mongoConnect(() => {
  app.listen(3002);
});
