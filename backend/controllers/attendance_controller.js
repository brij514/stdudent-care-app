import Attendance from "../models/attendance_model.js";
import mongoose from "mongoose";

//888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
export const getAttendance = async (req, res) => {
  let all_attendance = await Attendance.find();
  if (!all_attendance) {
    return res.status(400).json({ error: "There are no subjects" });
  }
  res.json({
    all_attendance: all_attendance.map((attendance) =>
      attendance.toObject({ getters: true })
    ),
  });
};
// 888888888888888888888888888888888888888888888888888888888888888888888888888

export const getAttendanceById = async (req, res) => {
  const { id } = req.params;
  const attendance = await Attendance.findById(id);
   console.log("Hey this is backend call")
  if (!attendance) {
    return res.status(400).json({ error: "There are no subjects" });
  }
  res.json({
    attendance :attendance
  });
};

//888888888888888888888888888888888888888888888888888888888888888888888888888888888
export const createAttendance = async (req, res) => {
  try {
    const { subject, class_absents, total_classes } = req.body;

    const attendance = await Attendance.findOne({ subject });
    if (attendance) {
      return res.status(400).json({ error: "subject already exists" });
    }

    let percentage = ((total_classes - class_absents) / total_classes) * 100;
    percentage = Math.round(percentage * 100) / 100;

    const newAttendance = new Attendance({
      subject,
      class_absents,
      total_classes,
      percentage,
    });

    if (newAttendance) {
      await newAttendance.save();

      //This will save data to DB.

      res.status(201).json({
        //This goes to frontend
        _id: newAttendance._id,
        subject: newAttendance.subject,
        class_absents: newAttendance.class_absents,
        percentage: newAttendance.percentage,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in attendance controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888889
export const updateAttendance = async (req, res) => {
  const { subject, class_absents, total_classes } = req.body;
  const { id } = req.params;

  let attendance = await Attendance.findById(id);
  if (!attendance) {
    return res.status(404).json({ error: "Attendance record not found" });
  }
  let percentage = ((total_classes - class_absents) / total_classes) * 100;
  percentage = Math.round(percentage * 100) / 100;

  attendance.subject = subject;
  attendance.class_absents = class_absents;
  attendance.total_classes = total_classes;
  attendance.percentage = percentage;

  try {
    await attendance.save();
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
  res.status(200).json({
    attendance: attendance.toObject({ getters: true }),
  });
};

//888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
export const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const attendance = await Attendance.findByIdAndDelete(id);
    if (!attendance) {
      return res.status(404).json({ error: "Attendance record not found" });
    }
    res.status(200).json({ message: "Attendance record deleted successfully" });
  } catch (error) {
    console.error("Error deleting attendance record:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
