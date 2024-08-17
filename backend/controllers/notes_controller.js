import Note from "../models/notes_model.js";
  

export const getNote = async (req,res)=>{
 const notes = await Note.find();
  if (!notes) {
    return res.status(400).json({ error: "There are no subjects" });
  }
  res.json({
    notes: notes.map((note) =>
      note.toObject({ getters: true })
    ),
  });

}
export const createNote = async (req, res) => {
  try {
    const { newNotes } = req.body;
    const newNote = new Note({
      toDo:newNotes,
    });

    if (newNote) {
      //Generate JWT token here

     
      await newNote.save(); //This will save data to DB.

      res.status(201).json({
        //This goes to frontend
        _id: newNote._id,
        toDo: newNote.toDo,
         
      });
    } else {
      res.status(400).json({ error: "Invalid note" });
    }
  } catch (error) {
    console.log("Error in note controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

 

export const deleteNote = async(req,res) => {
  try {
    const { id } = req.params;
    const notes = await Note.findByIdAndDelete(id);
    if (!notes) {
      return res.status(404).json({ error: "Note record not found" });
    }
    res.status(200).json({ message: "Note record deleted successfully" });
  } catch (error) {
    console.error("Error deleting Note record:", error);
    res.status(500).json({ error: "Internal Server Error in MNote controller" });
  }
}

 