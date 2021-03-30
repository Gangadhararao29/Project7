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
    cloud_name: process.env.cloudName,
    api_key: process.env.apiKey,
    api_secret: process.env.apiSecret
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

    // console.log("productObj", productObj)
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


productApiObj.get("/getproducts", errorHandler(async (req, res) => {
    //get all products from db
    let productsArray = await Product.find()

    res.send({ message: productsArray })
}))


  productApiObj.post('/updateprice',errorHandler(async (req, res) => {
      console.log(req.body)
    const product = await Product.findOneAndUpdate({"productName" : req.body.productName},{"productPrice":req.body.productPrice},{returnOriginal:false})

    res.send({message:"Update Successful", productName:req.body.productName})
  })
  )

  productApiObj.post('/deleteproduct',errorHandler(async (req, res) => {
    console.log(req.body)
  const product = await Product.findOneAndDelete({"productName" : req.body.productName},{returnOriginal:false})

  res.send({product})
})
)


//export
module.exports = productApiObj