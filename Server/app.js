import express, { json, urlencoded } from "express";
import {collectiona} from "./index.mjs";
import {collectionc} from "./index.mjs";
import {collectione} from "./index.mjs";

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

app.get("/clients", async (req, res) => {
  try {
      const data = await collectionc.find({}, 'uid password').lean();
      res.json(data);
  } catch (err) {
      res.status(500).json(err);
  }
});

app.get("/employees", async (req, res) => {
  try {
      const data = await collectione.find({}, 'uid password').lean();
      res.json(data);
  } catch (err) {
      res.status(500).json(err);
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

app.post("/homea/add-employee", async (req, res) => {
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


app.listen(8001, () => {
    console.log("Server is running on port 8001");
});


