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

userRouter.get("/bulk", async (req, res) => {
  const { filter } = req.query;
  try {
    const users = await User.find({
      $or: [
        {
          firstName: {
            $regex: filter,
          },
        },
        {
          lastName: {
            $regex: filter,
          },
        },
      ],
    });
    res.json({
      users: users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
    });
  } catch (error) {
    res.status(403).json({
      error,
    });
  }
});

export default userRouter;
