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

const collectiona = mongoose.model("admins", newSchema);

const collectionc = mongoose.model("clients", newSchema);

const employeeSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    dob: { type: Date, required: true },
    joiningDate: { type: Date, required: true },
    salary: { type: Number, required: true },
    address: { type: String, required: true }
});



const collectione = mongoose.model("employees", employeeSchema);

export {collectiona};
export { collectionc};
export { collectione};
