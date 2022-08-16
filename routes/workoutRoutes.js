import express from "express";
import {
  createWorkout,
  getAllWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} from "../controllers/workoutController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

// need authentication for all routes
router.use(requireAuth);

router.route("/").get(getAllWorkouts).post(createWorkout);
router
  .route("/:workoutId")
  .get(getWorkout)
  .patch(updateWorkout)
  .delete(deleteWorkout);

export default router;
