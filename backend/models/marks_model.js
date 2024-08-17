import mongoose from "mongoose";

 
const Schema = mongoose.Schema;

const marksSchema = new Schema({
  subject: { type: String, required: true },
  test1: { type: Number, required: true}, //unique adds only index in database.
  test2: { type: Number, required: true}, //unique adds only index in database.
  mid_sem: { type: Number, required: true },
  end_sem: { type: Number, required: true }
  });

 

const Mark = mongoose.model("Mark", marksSchema);
export default Mark;