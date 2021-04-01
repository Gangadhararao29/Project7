//import mongoose
const mongoose = require("mongoose")

//create a schema
const CartSchema = mongoose.Schema({
    userName : {type : String,required:true},
    productId : {type:Number,required:true},
    productName : {type:String,required:true},
    productPrice :  {type:Number,required:true},
    productBrand : {type:String,required:true},
    productImage : {type:String,required:true},
    Quantity:{type:Number,default:1}
})

//create a model
const Cart = mongoose.model("cart",CartSchema)

//export model
module.exports = Cart;