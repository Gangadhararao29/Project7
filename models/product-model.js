const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    productId:Number,
    productName:String,
    productPrice:Number,
    productBrand:String,
    productImage:String
})

const Product = mongoose.model('product',ProductSchema)

module.exports = Product;