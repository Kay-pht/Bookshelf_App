import mongoose from "mongoose";
import env from "dotenv";
mongoose.set("strictQuery", true);

env.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
