import express, { json, urlencoded } from "express";
import multer from "multer";


import mongoose from "mongoose";
import { collectiona, collectionc, collectione, employeeSchema, attendanceSchema,taskSchema,leaveSchema,ReimbursementSchema,clientSchema} from "./index.mjs";

const employees = mongoose.model("employees", employeeSchema);
const attendance = mongoose.model('attendance', attendanceSchema);
const Task = mongoose.model('Task', taskSchema);
const Leave = mongoose.model('Leave', leaveSchema);
const Reimbursement = mongoose.model('Reimbursement', ReimbursementSchema);

const Client = mongoose.model('Client', clientSchema);



import cors from "cors";

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:5173', // Allow only your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

app.get("/admins", async (req, res) => {
    try {
        const data = await collectiona.find({}, 'uid password').lean();
        res.json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});



app.get("/employees", async (req, res) => {
    try {
        const data = await collectione.find({}, 'uid password name phone email department dob joiningDate salary address').sort({uid: 1}).lean();
  
        res.json(data);
    } catch (err) {
        res.status(500).json(err);
    }
  });

  app.get('/employees/:uid', async (req, res) => {
    const { uid } = req.params;
    try {
      const employee = await collectione.findOne({ uid }).lean();
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.json(employee);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  app.put('/employees/:uid', async (req, res) => {
    const { uid } = req.params;
    const updatedData = req.body;
  
    try {
      const employee = await collectione.findOneAndUpdate({ uid }, updatedData, { new: true });
  
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.status(200).json(employee);
    } catch (error) {
      res.status(500).json({ message: 'Error updating employee', error });
    }
  });

  

  app.delete('/employees/:uid', async (req, res) => {
    const { uid } = req.params;
  
    try {
      const employee = await collectione.findOneAndDelete({ uid });
  
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting employee', error });
    }
  });
  

app.post("/loginforma", async (req, res) => {
    const { uid, password } = req.body;

    try {
        const check = await collectiona.findOne({ uid: uid });

        if (check) {
            res.json("exist");
        } else {
            res.json("notexist");
        }
    } catch (e) {
        res.json("notexist");
    }
});

app.post("/loginformc", async (req, res) => {
  const { uid, password } = req.body;

  try {
      const check = await collectionc.findOne({ uid: uid });

      if (check) {
          res.json("exist");
      } else {
          res.json("notexist");
      }
  } catch (e) {
      res.json("notexist");
  }
});

app.post("/loginforme", async (req, res) => {
  const { uid, password } = req.body;

  try {
      const check = await collectione.findOne({ uid: uid });

      if (check) {
          res.json("exist");
      } else {
          res.json("notexist");
      }
  } catch (e) {
      res.json("notexist");
  }
});

app.post("/addempa", async (req, res) => {
    const { uid, password, name, phone, email, department, dob, joiningDate, salary, address } = req.body;

    try {
        const newEmployee = new employees({
            uid,
            password,
            name,
            phone,
            email,
            department,
            dob,
            joiningDate,
            salary,
            address
        });

        await newEmployee.save();
        res.json({ message: "Employee added successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error adding employee", error: err });
    }
});

app.post('/attendance', async (req, res) => {
        const { year, month, date, day, data } = req.body;
    
        try {
            const newAttendance = new attendance({
                year,
                month,
                date,
                day,
                data
            });
    
            await newAttendance.save();
            res.status(200).send('Attendance recorded successfully');
        } catch (err) {
            res.status(500).json({ message: "Error recording attendance", error: err });
        }
    });

    app.get("/attendance", async (req, res) => {
        try {
          const data = await Attendance.find({}, 'data').lean();
          res.json(data);
        } catch (err) {
          res.status(500).json(err);
        }
      });
    
      app.get('/attendance/:uid', async (req, res) => {
        const { uid } = req.params;
      
        try {
          const employeeAttendance = await attendance.find({ [`data.${uid}`]: { $exists: true } })
            .sort({ year: -1, month: -1, date: -1 })  // Sorting by year, month, and date in descending order
            .lean();
      
          if (employeeAttendance.length === 0) {
            return res.status(404).json({ message: "No attendance records found for the given UID" });
          }
      
          res.status(200).json(employeeAttendance);
        } catch (err) {
          console.error("Error fetching attendance:", err);
          res.status(500).json({ message: "Error fetching attendance", error: err });
        }
      });

      app.get('/attendance/:year/:month/:date', async (req, res) => {
        const { year, month, date } = req.params;
      
        try {
          const attendanceRecords = await attendance.find({ year, month, date }).lean();
          res.status(200).json(attendanceRecords);
        } catch (err) {
          console.error("Error fetching attendance records:", err);
          res.status(500).json({ message: "Error fetching attendance records", error: err });
        }
      });

      app.put('/attendance/:year/:month/:date', async (req, res) => {
        const { year, month, date } = req.params;
        const updatedAttendance = req.body;
        try {
          await attendance.findOneAndUpdate(
            { year, month, date },
            updatedAttendance,
            { new: true }
          );
          res.json({ message: 'Attendance updated successfully' });
        } catch (error) {
          res.status(500).json({ message: 'Error updating attendance' });
        }
      });
      
      

      app.get('/attendance/monthly/:uid/:year/:month', async (req, res) => {
        const { uid, year, month } = req.params;
        try {
          const attendanceRecords = await attendance.find({ year, month });
          const monthlyAttendance = attendanceRecords.map(record => ({
            date: record.date,
            present: record.data.get(uid)?.present || false,
            absent: record.data.get(uid)?.absent || false,
            leave: record.data.get(uid)?.leave || false
          }));
          res.json(monthlyAttendance);
        } catch (error) {
          res.status(500).send(error);
        }
      });


      app.get('/attendance/:year/:month/employee/:uid', async (req, res) => {
        const { year, month, uid } = req.params;
        try {
          const attendanceRecords = await attendance.aggregate([
            {
              $match: {
                year: parseInt(year),
                month: parseInt(month),
                [`data.${uid}`]: { $exists: true }
              }
            },
            {
              $project: {
                date: 1,
                day: 1,
                status: `$data.${uid}`
              }
            },
            {
              $sort: {
                date: 1 // Ensure the records are sorted by date
              }
            }
          ]);
      
          res.json(attendanceRecords);
        } catch (error) {
          console.error('Error fetching attendance records:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      });
      
    
   

    app.post("/tasks", async (req, res) => {
      try {
        const { tasks } = req.body;
        const task = tasks[0]; // Since tasks array contains only one task
        const newTask = new Task(task);
        await newTask.save();
        res.status(201).send("Task assigned successfully!");
      } catch (error) {
        res.status(500).send("Error assigning task:", error.message);
      }
    });
    
    app.get("/tasks", async (req, res) => {
      const { status } = req.query;
      try {
        const tasks = await Task.find(status ? { status } : {}).sort({ deadline: 1 });
        res.json(tasks);
      } catch (error) {
        res.status(500).send("Error fetching tasks:", error);
      }
    });

    app.get("/tasks/:uid", async (req, res) => {
      try {
        const tasks = await Task.find({ uid: req.params.uid }).sort({ deadline: 1 });
        res.status(200).json({ tasks });
      } catch (error) {
        res.status(500).json({ error: "Error fetching tasks" });
      }
    });
    
    // Update task status
    app.post("/tasks/:taskId/status", async (req, res) => {
      try {
        const { status } = req.body;
        await Task.findByIdAndUpdate(req.params.taskId, { status });
        res.status(200).send("Task status updated successfully");
      } catch (error) {
        res.status(500).json({ error: "Error updating task status" });
      }
    });

    app.delete("/tasks/:id", async (req, res) => {
      try {
        const taskId = req.params.id;
        await Task.findByIdAndDelete(taskId);
        res.status(200).send("Task deleted successfully!");
      } catch (error) {
        res.status(500).send("Error deleting task:", error);
      }
    });
    

    app.post('/submit-leave', async (req, res) => {
      try {
        const leaveData = new Leave(req.body);
        await leaveData.save();
        res.status(201).send(leaveData);
      } catch (error) {
        res.status(400).send({ message: 'Error saving leave data', error });
      }
    });  
    
    app.get('/leaves', async (req, res) => {
      try {
        const leaves = await Leave.find().sort({ startDate: 1 });
        const leavesWithNames = await Promise.all(leaves.map(async leave => {
          const employee = await employees.findOne({ uid: leave.uid });
          return { ...leave.toObject(), name: employee ? employee.name : 'Unknown' };
        }));
        res.json(leavesWithNames);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    app.get('/leaves/:uid', async (req, res) => {
      try {
        const { uid } = req.params;
        const leaves = await Leave.find({ uid });
        res.json(leaves);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    app.delete('/leaves/:id', async (req, res) => {
      try {
        const { id } = req.params;
        await Leave.findByIdAndDelete(id);
        res.status(200).send({ message: 'Leave application deleted successfully' });
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    app.patch('/leaves/:id/status', async (req, res) => {
      try {
        const { id } = req.params;
        const { status } = req.body;
        await Leave.findByIdAndUpdate(id, { status });
        res.status(200).send({ message: 'Leave application status updated successfully' });
      } catch (error) {
        res.status(500).send(error.message);
      }
    });


app.use('/uploads', express.static('uploads'));



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

app.post('/reimbursement', upload.array('proofs'), async (req, res) => {
  try {
    console.log('Files:', req.files);
    console.log('Body:', req.body);

    const { uid, expenseType, description, startDate, endDate, vehicleType, totalKms, totalExpense, status } = req.body;
    const proofs = req.files.map(file => file.path);

    const newReimbursement = new Reimbursement({
      uid,
      expenseType,
      description,
      startDate,
      endDate,
      proofs,
      vehicleType,
      totalKms,
      totalExpense,
      status
    });

    await newReimbursement.save();

    res.status(200).json({ message: 'Reimbursement submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/reimbursement/:uid', async (req, res) => {
  try {
    const { uid } = req.params;
    const reimbursements = await Reimbursement.find({ uid }).sort({ startDate: 1 });
    res.json(reimbursements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.delete('/reimbursement/:id', async (req, res) => {
  try {
    const reimbursement = await Reimbursement.findByIdAndDelete(req.params.id);
    if (!reimbursement) {
      return res.status(404).send('Reimbursement not found');
    }
    res.status(200).send('Reimbursement deleted');
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/reimbursements', async (req, res) => {
  try {
    const reimbursements = await Reimbursement.find().sort({uid:1},{ startDate: 1 });
    const employeeData = await employees.find();

    const reimbursementsWithEmployeeName = reimbursements.map((reimbursement) => {
      const employee = employeeData.find(emp => emp.uid === reimbursement.uid);
      return {
        ...reimbursement._doc,
        employeeName: employee ? employee.name : 'Unknown',
      };
    });

    res.json(reimbursementsWithEmployeeName);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.patch('/reimbursements/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const reimbursement = await Reimbursement.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.json(reimbursement);
  } catch (error) {
    res.status(500).send(error);
  }
});


app.post('/addclient', (req, res) => {
  const { uid, password, clientType, name, phone, address, locationLink } = req.body;

  const newClient = new Client({
    uid,
    password,
    clientType,
    name,
    phone,
    address,
    locationLink
  });

  newClient.save()
    .then(client => res.json(client))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.get('/clients', (req, res) => {
  Client.find().sort({ uid: 1 })
    .then(clients => res.json(clients))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.get('/clients/:uid', async (req, res) => {
  try {
    const client = await Client.findOne({ uid: req.params.uid });
    if (!client) return res.status(404).send('Client not found');
    res.status(200).json(client);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update a client by UID
app.put('/clients/:uid', async (req, res) => {
  try {
    const client = await Client.findOneAndUpdate({ uid: req.params.uid }, req.body, { new: true });
    if (!client) return res.status(404).send('Client not found');
    res.status(200).json(client);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete a client by UID
app.delete('/clients/:uid', async (req, res) => {
  try {
    const client = await Client.findOneAndDelete({ uid: req.params.uid });
    if (!client) return res.status(404).send('Client not found');
    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (err) {
    res.status(500).send(err);
  }
});







app.listen(8001, () => {
    console.log("Server is running on port 8001");
});

