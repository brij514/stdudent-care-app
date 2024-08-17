import express from "express";

 
import { deleteNote, createNote, getNote } from "../controllers/notes_controller.js";

const router = express.Router();

router.get("/get", getNote);
router.post("/new", createNote);
router.delete("/:id", deleteNote);

export default router;
