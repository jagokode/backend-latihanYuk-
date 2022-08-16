import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import workoutRoutes from "./routes/workoutRoutes.js";
import userRoutes from "./routes/userRoute.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Connected to DB and running on port ${PORT}`)
    );
  })
  .catch((error) => console.log(error));
