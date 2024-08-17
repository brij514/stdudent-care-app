import mongoose from "mongoose";

 
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  toDo: { type: String, required: true },
  
  });

 

const Note = mongoose.model("Note", noteSchema);
export default Note;
