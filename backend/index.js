const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const URL = "mongodb+srv://ram:12345@cluster0.gmysw.mongodb.net/mycoffe"
const PORT = 3000

const UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    number:Number
})

const UserModel = mongoose.model('users', UserSchema)

const CartSchema = new mongoose.Schema({
        id:Number,
        images:[String],
        title:String,
        new_price:String,
        old_price:Number
})

const CartModel = mongoose.model('cartItems', CartSchema)
const postModel = mongoose.model('postItem', CartSchema)
const productModel = mongoose.model('productItem', CartSchema)

app.use(express.json())
app.use(cors())

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


mongoose.connect(URL).then(()=>{
    console.log("DB is Connected")
})

app.post('/contact',(req,res)=>{
    UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

app.get('/menuCart',(req,res)=>{
    CartModel.find({})
    .then(user => res.json(user))
    .catch(err => res.json(err))

})

app.get('/menuCart/:id',(req,res)=>{
    const id = req.params.id
    CartModel.findById({_id:id})
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

app.post('/postCart',(req,res)=>{
    postModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

app.get('/getCart',(req,res)=>{
    postModel.find({})
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

app.get('/remove/:id',(req,res)=>{
    const id = req.params.id
    postModel.findByIdAndDelete({_id:id})
    .then(user => res.json(user))
    .catch(err => res.json(err))
    
})

app.get('/productItem',(req,res)=>{
    productModel.find({})
    .then(user => res.json(user))
    .catch(err => res.json(err))

})

app.listen(PORT,()=>{
    console.log("Server Is Running")
})
