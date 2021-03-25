const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userName:String,
    email:String,
    password:String,
    userTypeAdmin: {
        type:Boolean,
        default:false
    }
})

const User = mongoose.model('user',UserSchema)

module.exports = User;