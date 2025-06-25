import { Router } from "express";
import { z } from "zod";
import { User } from "../db/db";
import { authMiddleware } from "../middlewares/middleware";
const userRouter = Router();

const updateBody = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  password: z.string().optional(),
});

userRouter.post("/update", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(403).json({
      msg: "invalid inputs!",
    });
  }
  await User.updateOne(req.body, {
    // @ts-ignore
    id: req.userId,
  });
  res.json({
    msg: "Updated Successfully!",
  });
});

export default userRouter;
