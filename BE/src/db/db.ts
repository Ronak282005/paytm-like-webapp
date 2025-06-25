import { connect, model, Schema } from "mongoose";
import { ENV } from "../config/env";

connect(ENV.DB_URL);

const userSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = model("User", userSchema);

const accountSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    balance: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const Account = model("Account", accountSchema);
