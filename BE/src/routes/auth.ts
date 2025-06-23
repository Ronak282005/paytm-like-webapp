import { Router } from "express";
import { User } from "../db/db";
import bcrypt from "bcrypt";
import { z } from "zod";

const authRouter = Router();

const signupInput = z.object({
    username : z.string(),
    firstName : z.string(),
    lastName : z.string(),
    password : z.string().min(8)
})

authRouter.post("/signup", async (req, res) => {
  const { username, firstName, lastName, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = new User({
      username,
      firstName,
      lastName,
      password: hashedPassword,
    });
    await user.save();
    res.json({
      msg: "user created succesfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "something went wrong!",
    });
  }
});

export default authRouter
