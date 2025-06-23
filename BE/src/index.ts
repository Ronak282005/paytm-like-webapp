import express, { json } from "express";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";

const app = express();
app.use(json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

app.listen(8080, () => {
  console.log("====================================");
  console.log("listening on the port 8080");
  console.log("====================================");
});
