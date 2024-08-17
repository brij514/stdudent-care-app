import Mark from "../models/marks_model.js";



//88888888888888888888888888888888888888888888888888888888888888888888888888888888888
export const getMarks = async (req, res) => {
  let all_marks = await Mark.find();
  if (!all_marks) {
    return res.status(400).json({ error: "There are no subjects" });
  }
  res.json({
    all_marks: all_marks.map((mark) =>
      mark.toObject({ getters: true })
    ),
  });
};
//8888888888888888888888888888888888888888888888888888888888888888888


export const getMarksById = async (req, res) => {
  const { id } = req.params;
   
  const mark = await Mark.findById(id);
   
  if (!mark) {
    return res.status(400).json({ error: "There are no subjects" });
  }
  res.json({
    mark : mark
  });

};

//888888888888888888888888888888888888888888888888888888888888888888888888888888888888
export const createMarks = async (req, res) => {
  
    const { subject, test1, test2, mid_sem, end_sem } = req.body;

    const mark = await Mark.findOne({ subject });
    if (mark) {
      return res.status(400).json({ error: "subject already exists" });
    }

    const newMark = new Mark({
      subject,
      test1,
      test2,
      mid_sem,
      end_sem,
    });
 


    try{
    if (newMark) {
      
    
      await newMark.save(); //This will save data to DB.

      res.status(201).json({
        //This goes to frontend
        _id: newMark._id,
        subject: newMark.subject,
        test1: newMark.test1,
        test2: newMark.test2,
        mid_sem: newMark.mid_sem,
        end_sem: newMark.end_sem,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in marks controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//8888888888888888888888888888888888888888888888888888888888888888888888888888888888

export const updateMarks = async (req, res) => {
  const { subject, test1, test2, mid_sem, end_sem } = req.body;
   const {id} = req.params;

  let mark = await Mark.findById(id);
  if (!mark) {
    return res.status(404).json({ error : "Marks record not found" });
  }
  mark.subject = subject;
  mark.test1 = test1;
  mark.test2 = test2;
  mark.mid_sem = mid_sem;
  mark.end_sem = end_sem;
   

  try {
    await mark.save();
    
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
  res
    .status(200)
    .json({
      mark: mark.toObject({ getters: true })
    });
};

//88888888888888888888888888888888888888888888888888888888888888888888888888888888888888


export const deleteMarks = async (req, res) => {
  try {
    const { id } = req.params;
    const mark = await Mark.findByIdAndDelete(id);
    if (!mark) {
      return res.status(404).json({ error: "Mark record not found" });
    }
    res.status(200).json({ message: "Mark record deleted successfully" });
  } catch (error) {
    console.error("Error deleting mark record:", error);
    res.status(500).json({ error: "Internal Server Error in Marks controller" });
  }
};
