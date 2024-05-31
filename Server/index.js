import express, { text } from "express";
import { UUID } from "mongodb";

import mongoose, { mongo } from "mongoose";

mongoose.connect("mongodb+srv://ipowertree:nP0d1pAEWVXpXYoK@imagine.onigxmo.mongodb.net/?retryWrites=true&w=majority&appName=imagine")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed");
})
const app = express()

app.listen(3000, () => {
    console.log("Server is running")
})

const newSchema = new mongoose.Schema({
    UID: {
        type: String,
        required: true
    },

        Password: {
        type: String ,
        required: true
    }


})

const collection = mongoose.model("collection",newSchema)
module.exports=collection
