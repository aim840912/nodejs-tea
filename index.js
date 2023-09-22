const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const authRoute = require("./routes").auth;
const courseRoute = require("./routes").course;
const passport = require('passport');
require('./config/passport')(passport);
const cors = require('cors');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", authRoute);

// course route 應該被 jwt 保護
// if request header 內部沒有 jwt , 則 request 就會被視為 unauthorized
app.use("/api/products",
    passport.authenticate("jwt", { session: false }),
    courseRoute);

mongoose
    .connect(process.env.DB_CONNECT)
    .then((result) => {
        app.listen(process.env.PORT || 8080)
    }).catch((err) => {
        console.log(err);
    });


