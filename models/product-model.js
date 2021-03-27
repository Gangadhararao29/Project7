const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    productId:Number,
    productName:String,
    productPrice:Number,
    productBrand:String,
    productCategory:String,
    productDescription:String,
    productRating:{
        type:[{
        userName:String,
        userRating:Number,
        userComments:String
    }],
    default:undefined
    
 },
    productImage:String
})

const Product = mongoose.model('product',ProductSchema)

module.exports = Product;