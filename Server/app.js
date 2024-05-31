const express = require("express")

const collection = require("./index")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.get("/",cors(),(req,res)=>{

})

app.post("/",async(req,res)=>{
    const[UID,Password]=req.body

    try{
        const check=await collection.findOne({UID:UID})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
            await collection.insertMany([data])
        }

    }
    catch(e){
        res.json("notexist")

    }


})

app.listen(8000,()=>{
    console.log("port connected");
})