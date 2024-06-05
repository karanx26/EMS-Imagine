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

app.get('/admin/:uid', (req, res) => {
    const uid = req.params.uid;

    // Ensure uid is a valid ObjectId
    if (!ObjectId.isValid(uid)) {
        return res.status(400).json({ Status: false, Error: "Invalid UID" });
    }

    collectiona.findOne({ _id: new ObjectId(uid) }, (err, result) => {
        if (err) {
            console.error('Query Error:', err);
            return res.status(500).json({ Status: false, Error: "Query Error", Details: err.message });
        }
        if (!result) {
            return res.status(404).json({ Status: false, Error: "Admin not found" });
        }

        return res.json({ Status: true, Result: result });
    });
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




app.listen(8001, () => {
    console.log("Server is running on port 8001");
});

