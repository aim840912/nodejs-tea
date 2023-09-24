const mongoose = require('mongoose')
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["owner", "customer"],
        default: "customer"
    },
    date: {
        type: Date,
        default: Date.now
    }
})

userSchema.methods.isOwner = function () {
    return this.role == "owner";
};

userSchema.methods.comparePassword = async function (password, cb) {
    let result;
    try {
        result = await bcrypt.compare(password, this.password);
        return cb(null, result);
    } catch (e) {
        return cb(e, result);
    }
};

userSchema.pre("save", async function (next) {
    // this 代表 mongoDB 內的 document
    if (this.isNew || this.isModified("password")) {
        const hashValue = await bcrypt.hash(this.password, 10);
        this.password = hashValue;
    }
    next();
});


module.exports = mongoose.model('User', userSchema)