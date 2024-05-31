const express = require("express")

const collection = require("./index.mjs")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.get("/loginforma",cors(),(req,res)=>{

})

app.post("/loginforma",async(req,res)=>{
    const[uid,password]=req.body

    try{
        const check=await collection.findOne({uid:uid})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
            // await collection.insertMany([data])
        }

    }
    catch(e){
        res.json("notexist")

    }


})

app.listen(8000,()=>{
    console.log("port connected");
})