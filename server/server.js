const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = 5000

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/bookmyshow")

// Movie Schema
const MovieSchema=new mongoose.Schema({
name:String,
price:Number,
image:String
})

const Movie=mongoose.model("Movie",MovieSchema)

// Booking Schema
const BookingSchema = new mongoose.Schema({
movieId:String,
seats:[Number],
totalPrice:Number
});

const Booking = mongoose.model("Booking",BookingSchema);

// Movies API
app.get("/movies",async(req,res)=>{
const movies=await Movie.find()
res.json(movies)
})

// Booking API
app.post("/book",async(req,res)=>{

const booking=new Booking(req.body)

await booking.save()

res.json({message:"Booking Successful"})

})

// Listen
app.listen(port,()=>{
console.log("Server running on port 5000")
})