import Workout from "../models/workoutModel.js";
import mongoose from "mongoose";

const getAllWorkouts = async (req, res) => {
  const user_id = req.user._id;
  const allWorkouts = await Workout.find({ user_id }).sort({ createdAt: -1 });

  if (allWorkouts.length === undefined)
    return res.status(400).json({ error: "Oops Someting went wrong" });

  return res.status(200).json(allWorkouts);
};

const getWorkout = async (req, res) => {
  const { workoutId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(workoutId))
    return res.status(404).json({ error: "Workout does not exist" });

  const workout = await Workout.findById(workoutId);

  if (!workout)
    return res.status(404).json({ error: "Workout does not exist" });

  return res.status(200).json(workout);
};

const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  let emptyFields = [];

  if (!title) emptyFields.push("title");
  if (!load) emptyFields.push("load");
  if (!reps) emptyFields.push("reps");
  if (emptyFields.length > 0)
    return res
      .status(400)
      .json({ error: "Mohon semua kolom diisi", emptyFields });

  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ ...req.body, user_id });
    return res.status(201).json(workout);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateWorkout = async (req, res) => {
  const { workoutId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(workoutId))
    return res.status(404).json({ error: "Workout does not exist" });

  const workout = await Workout.findOneAndUpdate(
    { _id: workoutId },
    { ...req.body }
  );

  if (!workout)
    return res.status(400).json({ error: "Workout does not exist" });

  return res.status(201).json(workout);
};

const deleteWorkout = async (req, res) => {
  const { workoutId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(workoutId))
    return res.status(404).json({ error: "Workout does not exist" });

  const workout = await Workout.findOneAndDelete({ _id: workoutId });

  if (!workout)
    return res.status(400).json({ error: "Workout does not exist" });

  return res.status(200).json(workout);
};

export {
  getAllWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
