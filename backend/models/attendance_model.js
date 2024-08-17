import mongoose from "mongoose";

const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  subject: { type: String, required: true },
  class_absents: { type: Number, required: true }, //unique adds only index in database.
  total_classes: { type: Number, required: true }, //unique adds only index in database.
  percentage: { type: Number, required: true }
   
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
