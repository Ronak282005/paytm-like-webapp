import { Router } from "express";
import { User } from "../db/db";
import bcrypt from "bcrypt";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";

const authRouter = Router();

const signupInput = z.object({
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().min(8),
});

authRouter.post("/signup", async (req, res) => {
  const { success } = signupInput.safeParse(req.body);
  const { username, firstName, lastName, password } = req.body;
  if (!success) {
    res.status(403).json({
      msg: "invalid inputs!",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const alreadyUser = await User.findOne({
      username,
    });
    if (alreadyUser) {
      res.status(403).json({
        msg: "Email already taken",
      });
    }
    const user = new User({
      username,
      firstName,
      lastName,
      password: hashedPassword,
    });
    await user.save();
    const token = jwt.sign(
      {
        userId: user._id,
      },
      ENV.JWT_SECRET
    );
    res.json({
      msg: "user created succesfully!",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "something went wrong!",
    });
  }
});

export default authRouter;
