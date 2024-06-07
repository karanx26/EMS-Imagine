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
    email: { type: String, required: true },
    department: { type: String, required: true },
    dob: { type: String, required: true },
    joiningDate: { type: String, required: true },
    salary: { type: Number, required: true },
    address: { type: String, required: true }
});

const attendanceSchema = new mongoose.Schema({
    year: Number,
    month: Number,
    date: Number,
    day: String,
    data: Object
  });
  
  const Attendance = mongoose.model('Attendance', attendanceSchema);
  






const taskSchema = new mongoose.Schema({
  uid: { type: String,required: true, },
  task: {type: String,required: true,},
  deadline: {type: Date,required: true,},
});

const Task = mongoose.model('Task', taskSchema);






const collectione = mongoose.model("employees", employeeSchema);

export { collectiona, collectionc, collectione, employeeSchema, Attendance};

