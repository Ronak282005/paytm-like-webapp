import express, { json } from "express";
import { User } from "./db/db";

const app = express()
app.use(json())

app.get("/",(req,res)=>{
    res.json({
        msg : "Hello there"
    })
})

app.post("/api/v1/signup",async(req,res)=>{
    const {username,firstName,lastName,password} = req.body
    try {
        const user = await new User({
            username,
            firstName,
            lastName,
        })
    } catch (error) {
        
    }
})

app.listen(8080,()=>{
    console.log('====================================');
    console.log("listening on the port 8080");
    console.log('====================================');
})