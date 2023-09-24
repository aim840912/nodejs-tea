const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const authRoute = require("./routes").auth;
const productRoute = require("./routes").product;
const passport = require('passport');
require('./config/passport')(passport);
const cors = require('cors');
const upload = require("./config/multer")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/user", authRoute);

// course route 應該被 jwt 保護
// if request header 內部沒有 jwt , 則 request 就會被視為 unauthorized
app.use("/api/products",
    passport.authenticate("jwt", { session: false }),
    productRoute);

mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => {
        console.log("connect to mongodb")
        app.listen(process.env.PORT, () => {
            console.log("listen on port 8080")
        })
    }).catch((err) => {
        console.log(err);
    });


