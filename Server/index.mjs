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

  //define the leave schema

  const leaveSchema = new mongoose.Schema({
    uid: { type: String, required: true },
    leaveType: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    reason: { type: String, required: true },    
    status: { type: String, default: "Pending" }
  });


  
  

  




  const taskSchema = new mongoose.Schema({
    uid: String,
    task: String,
    description: String,
    deadline: Date,
    status: { type: String, default: "Pending" }
  });

  const ReimbursementSchema = new mongoose.Schema({
    uid: { type: String, required: true },
    expenseType: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    proofs: { type: [String], required: true },
    vehicleType: { type: String },
    totalKms: { type: Number },
    totalExpense: { type: Number },
    status: { type: String, default: "Pending" }
  });





const collectione = mongoose.model("employees", employeeSchema);

export { collectiona, collectionc, collectione, employeeSchema, attendanceSchema,taskSchema,leaveSchema,ReimbursementSchema};

