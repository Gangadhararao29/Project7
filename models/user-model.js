const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:String,
    password:String,
    userTypeAdmin: {
        type:Boolean,
        default:false
    },
    cart:[Number],
})

const User = mongoose.model('user',UserSchema)

module.exports = User;