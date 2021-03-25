//mini express
const exp = require("express")
const productApiObj = exp.Router()

//import express-async-handler
const errorHandler = require("express-async-handler")
const Product = require("../models/product-model")
const jwt = require("jsonwebtoken");
//import
productApiObj.use(exp.json())

//imports
const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const multer = require("multer")

//configure cloudinary
cloudinary.config({
    cloud_name: 'cloudinaryganga29',
    api_key: '475142755956332',
    api_secret: 'ukOvWtKqI6wuyJoTlPmPcVf3nKI'
});

//configure cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: 'productPictures',
            public_id: file.fieldname + '-' + Date.now()
        }
    },
});

//configure multer
var upload = multer({ storage: storage })


//create a product

productApiObj.post("/addproduct", upload.single('photo'), errorHandler(async (req, res) => {

    //console.log("url path is ",req.file.path); 

    let productObj = JSON.parse(req.body.userObj);
    productObj.productImage = req.file.path;

    console.log("productObj", productObj)
    //search for product in db with productId
    let productObjFromDb = await Product.findOne({ productId: productObj.productId })
    //if product doesn't exists
    if (productObjFromDb == null) {
        //create a new object
        let newProductObj = new Product(productObj)
        //console.log(newProductObj)
        //save it 
        await newProductObj.save()
        res.send({ message: "Product added" })
    }
    else {
        res.send({ message: "product already exists" })
    }

}))
//get all products


productApiObj.get("/productsget", errorHandler(async (req, res) => {

    //get all products from db
    let productsArray = await Product.find()

    res.send({ message: productsArray })
}))




//export
module.exports = productApiObj