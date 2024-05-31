import express from "express";

import mongoose from "mongoose";

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


