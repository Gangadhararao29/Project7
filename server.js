const express = require("express")
const app = express();
const bodyparser = require("body-parser")
const path = require("path")
require("dotenv").config();

const mongoose =require("mongoose")
mongoose.connect(process.env.dburl,{useNewUrlParser:true, useUnifiedTopology:true , useFindAndModify: false })
const db = mongoose.connection;


app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.use(express.static(path.join(__dirname , "/dist/FarmFreshApp")))

const productApiObj = require("./APIS/product-api")
const userApiObject = require("./APIS/user-api")

app.use("/user",userApiObject)
app.use("/product",productApiObj)

db.on('error',()=>console.log("error connecting db"))
db.once("open",()=>console.log("Connected to Db"))


const port = process.env.PORT;
app.listen(port,()=>{
    console.log("the server started at port "+port)
})
