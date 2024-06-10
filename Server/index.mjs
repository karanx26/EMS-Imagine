import mongoose from "mongoose";

import multer from "multer";

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

const individualAttendanceSchema = new mongoose.Schema({
    uid: { type: String, required: true },
    present: { type: Boolean },
    absent: { type: Boolean },
    leave: { type: Boolean },
  }, { _id: false });
  
  // Define the main attendance schema
  const attendanceSchema = new mongoose.Schema({
    year: { type: Number, required: true },
    month: { type: Number, required: true },
    date: { type: Number, required: true },
    day: { type: String, required: true },
    data: {
      type: Map,
      of: individualAttendanceSchema,
      required: true,
    },
  });
  
  
  




  const taskSchema = new mongoose.Schema({
    uid: String,
    task: String,
    description: String,
    deadline: Date,
    status: { type: String, default: "Pending" }
  });

  const reimbursementSchema = new mongoose.Schema({
    uid: String,
    expenseType: String,
    description: String,
    startDate: Date,
    endDate: Date,
    proofs: [String],
    vehicleType: String,
    totalKms: Number,
    totalExpense: Number
  });
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });





const collectione = mongoose.model("employees", employeeSchema);

export { collectiona, collectionc, collectione, employeeSchema, attendanceSchema,taskSchema,reimbursementSchema,storage};

