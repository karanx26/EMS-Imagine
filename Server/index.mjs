// import mongoose, { mongo } from "mongoose";
// import express from "express";

// const someAsyncOperation = () => {
//     return new Promise((resolve, reject) => {
//         // Simulate an async operation using setTimeout
//         setTimeout(() => {
//             resolve('Success');
//         }, 1000);
//     });
// };


// mongoose.connect("mongodb+srv://ipowertree:nP0d1pAEWVXpXYoK@imagine.onigxmo.mongodb.net/?retryWrites=true&w=majority&appName=imagine", { useNewUrlParser: true, useUnifiedTopology: true });
// someAsyncOperation()
// .then(()=>{
//     console.log("mongodb connected");
// })
// .catch(()=>{
//     console.log("failed");
// })
// const app = express()

// app.listen(8001, () => {
//     console.log("Server is running")
// })

// const newSchema = new mongoose.Schema({
//     uid: {
//         type: String,
//         required: true
//     },

//         password: {
//         type: String ,
//         required: true
//     }
// })

// const collection = mongoose.model("collections",newSchema)

// export default collection;


import mongoose from "mongoose";
// import express from "express";

const someAsyncOperation = () => {
    return new Promise((resolve, reject) => {
        // Simulate an async operation using setTimeout
        setTimeout(() => {
            resolve('Success');
        }, 1000);
    });
};

mongoose.connect("mongodb+srv://ipowertree:nP0d1pAEWVXpXYoK@imagine.onigxmo.mongodb.net/?retryWrites=true&w=majority&appName=imagine", { useNewUrlParser: true, useUnifiedTopology: true });
someAsyncOperation()
    .then(() => {
        console.log("mongodb connected");
    })
    .catch(() => {
        console.log("failed");
    });

const newSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const collection = mongoose.model("collections", newSchema);

export default collection;
