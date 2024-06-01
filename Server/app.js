import express, { json, urlencoded } from "express";
import collection from "./index.mjs";
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
        const data = await collection.find({}, 'uid password').lean();
        res.json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.post("/loginforma", async (req, res) => {
    const { uid, password } = req.body;

    try {
        const check = await collection.findOne({ uid: uid });

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

