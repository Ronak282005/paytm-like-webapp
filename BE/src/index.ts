import express from "express";

const app = express()

app.get("/",(req,res)=>{
    res.json({
        msg : "Hello there"
    })
})


app.listen(8080,()=>{
    console.log('====================================');
    console.log("listening on the port 8080");
    console.log('====================================');
})