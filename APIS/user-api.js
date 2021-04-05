const express = require('express')
const bcrypt = require('bcryptjs')
const userModel = require('../models/user-model')
const jwt = require("jsonwebtoken")

const userApiObject = express.Router();
const errorHandler = require("express-async-handler")


// import validate token middleware
const validateToken = require("./middlewares/verifyToken")

// userApiObject.get('/getuser', async (req, res) => {
//   const user = await userModel.find()

//   try {
//     res.send({ user });
//   }
//   catch (err) {
//     res.sendStatus(500).send(err);
//   }
// })
userApiObject.get('/getuser/:userName', errorHandler(async (req, res) => {
  const user = await userModel.findOne({ 'userName': req.params.userName })
  // console.log(user)
  if (user) {
    res.send({ message: user })
  }
  else {
    res.send({ message: "No user found" })
  }
}))

userApiObject.post('/checkuser', async (req, res) => {
  const user = await userModel.findOne({ "userName": req.body.userName })

  if (user != null) {
    try {
      res.send({ message: "Username already present" });
    }
    catch (err) {
      res.sendStatus(500).send(err);
    }
  }
  else {
    try { res.send({ message: "Continue......." }) }
    catch (err) {
      res.sendStatus(500).send(err);
    }
  }
})

userApiObject.post('/checkadminuser', async (req, res) => {
  const user = await userModel.findOne({ "userName": req.body.userName })
  // console.log("request",req.body)
  // console.log("user",user)
  if (user.userTypeAdmin) {
    try {
      res.send({ message: "User is Admin" });
    }
    catch (err) {
      res.sendStatus(500).send(err);
    }
  }
  else {
    try { res.send({ message: "Not Admin" }) }
    catch (err) {
      res.sendStatus(500).send(err);
    }
  }
})

userApiObject.post('/createuser', async (req, res) => {
  // const prevData = await userModel.findOne({ "Id": (req.body.Id * 1) })
  const prevData = await userModel.findOne({ "userName": req.body.userName })
  if (!prevData) {

    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const user = new userModel(req.body);

    try {
      await user.save();
      res.send({ message: "New User Added" });
    }
    catch (err) {
      res.status(500).send(err);
    }
  }
  else {
    res.status(200).send({ message: "User Id already exists" })
  }
});

// userApiObject.delete('/getuser/:Id', async (req, res) => {
//   try {
//     const user = await userModel.deleteOne({ "Id": (req.params.Id * 1) })
//     if (!user) res.status(404).send("No item found")
//     res.status(200).send({ message: "User deleted successfully", user });
//   } catch (err) {
//     res.status(500).send(err)
//   }
// })

// userApiObject.patch('/getuser/:Id', async (req, res) => {
//   try {
//     const user = await userModel.updateOne({ Id: req.params.Id * 1 }, { Name: req.body.Name, Price: req.body.Price, Brand: req.body.Brand })
//     await userModel.save()
//     res.status(200).send(user)
//   }
//   catch (err) {
//     res.status(500).send(err)
//   }
// })


userApiObject.post("/login", async (req, res) => {

  let loginObj = req.body;
  let userData = await userModel.findOne({ userName: loginObj.userName })

  // console.log("loginObj.userName")

  if (loginObj.userName == "") {
    res.send({ message: "Please enter Username" })
  }
  if (!userData) {
    res.send({ message: "Username not found" })
  }

  let value = await bcrypt.compare(loginObj.password, userData.password)

  if (value) {
    let signedToken = await jwt.sign({ userName: loginObj.userName }, process.env.SECRET, { expiresIn: 1000 })
    // console.log(loginObj)
    res.send({ message: "login successful", token: signedToken, userName: loginObj.userName, userTypeAdmin: userData.userTypeAdmin })
  }
  else {
    res.send({ message: "Invalid password" })
  }

})

userApiObject.post('/addtocart', errorHandler(async (req, res) => {

  const cartObj = await userModel.findOne({ "userName": req.body.userName, cart: { $elemMatch: { productId: req.body.productId } } })

  if (cartObj) {

    for (let x of cartObj.cart) {
      if (x.productId == req.body.productId) {
        x.quantity++;
      }
    }
    // console.log('cartObj',cartObj)
    res.send({ message: "Product quantity updated" })
    await cartObj.save();
  }
  else {
    const newItem = await userModel.findOneAndUpdate({ "userName": req.body.userName },
      { $push: { "cart": { productId: req.body.productId } } }, { returnOriginal: false, upsert: true, new: true })

    res.send({ message: "Product added to the cart Successful" })
  }


}))

userApiObject.get('/getcart/:userName', errorHandler(async (req, res) => {

  const user = await userModel.findOne({ 'userName': req.params.userName })
  res.send({ message: user.cart })
}))

userApiObject.post('/removequantity/:userName/:id', errorHandler(async (req, res) => {

  const cartObj = await userModel.findOne({ "userName": req.params.userName, cart: { $elemMatch: { productId: req.params.id } } })

  if (cartObj.cart) {

    for (let x of cartObj.cart) {
      if (x.productId == req.params.id) {
        x.quantity--;
        if (x.quantity < 1) {
          const newItem = await userModel.findOneAndUpdate({ "userName": req.params.userName },
            { $pull: { 'cart': { productId: req.params.id } } }, { returnOriginal: false, upsert: true, new: true })

          res.send({ message: "Product deleted from the cart Successful" })
        }
      }
    }
    // console.log('cartObj',cartObj)
    res.send({ message: "Reduced Quantity" })
    await cartObj.save();
  }
}))

userApiObject.post('/removecartitem/:userName/:id', errorHandler(async (req, res) => {

  const findItem = await userModel.findOneAndUpdate({ "userName": req.params.userName },
    { $pull: { 'cart': { productId: req.params.id } } }, { returnOriginal: false, upsert: true, new: true })

  // console.log(findItem);
  res.send({ message: "Product deleted from the cart Successful" })

}))

userApiObject.get('/getcount/:userName', errorHandler(async (req, res) => {
  let count = 0;
  const cartObj = await userModel.findOne({ "userName": req.params.userName })
  for (let x of cartObj.cart) {
    count += x.quantity;
  }
  res.send({ message: count })
}))


module.exports = userApiObject;