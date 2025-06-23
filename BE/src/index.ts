import express, { json } from "express";
import {authRouter} from "./routes/auth"

const app = express()
app.use(json())
app.use("/api/v1/auth",authRouter)


app.listen(8080,()=>{
    console.log('====================================');
    console.log("listening on the port 8080");
    console.log('====================================');
})