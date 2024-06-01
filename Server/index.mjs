import mongoose from "mongoose";

const someAsyncOperation = () => {
    return new Promise((resolve, reject) => {
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

const collection = mongoose.model("admins", newSchema);

export default collection;
