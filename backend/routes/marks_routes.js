import express from "express";

import {
  createMarks,
  deleteMarks,
  getMarksById,
  getMarks,
  updateMarks,
} from "../controllers/marks_controller.js";

const router = express.Router();

router.get("/get", getMarks);
router.post("/new", createMarks);
router.get("/:id", getMarksById);
router.patch("/update/:id", updateMarks);
router.delete("/:id", deleteMarks);

export default router;
