import express, { json } from "express";

const app = express()
app.use(json())
app.use("/api/v1/auth")


app.listen(8080,()=>{
    console.log('====================================');
    console.log("listening on the port 8080");
    console.log('====================================');
})