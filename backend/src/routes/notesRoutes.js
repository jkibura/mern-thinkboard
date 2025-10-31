import express from "express";
import {
  createNewNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from "../controllers/notesControllers.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById)
router.post("/", createNewNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
