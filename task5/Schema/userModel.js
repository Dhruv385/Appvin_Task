const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    phoneNo: {
        type: String,
        require: true,
        unique: true
    }
});

const userSchema = mongoose.model('UserSchema',user);
module.exports = userSchema;
