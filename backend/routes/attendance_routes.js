import express from "express";

import {
  createAttendance,
  deleteAttendance,
  getAttendance,
  getAttendanceById,
  updateAttendance,
} from "../controllers/attendance_controller.js";

const router = express.Router();

router.get("/get", getAttendance);
router.post("/new", createAttendance);
router.get("/:id", getAttendanceById);
router.patch("/update/:id", updateAttendance);
router.delete("/:id", deleteAttendance);

export default router;
