import { connect } from "mongoose";
import { ENV } from "../config/env";

connect(ENV.DB_URL)