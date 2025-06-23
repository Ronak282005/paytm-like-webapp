import express, { json } from "express";
import cors from 'cors';
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import { ENV } from "./config/env";

const app = express();
app.use(json());
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

app.listen(ENV.PORT, () => {
  console.log("====================================");
  console.log("listening on the port 8080");
  console.log("====================================");
});
