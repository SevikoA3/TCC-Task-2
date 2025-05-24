import express from "express";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../controller/noteController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const NoteRouter = express.Router();

NoteRouter.get("/notes", verifyToken, getNotes);
NoteRouter.post("/note", verifyToken, createNote);
NoteRouter.patch("/note/:id", verifyToken, updateNote);
NoteRouter.delete("/note/:id", verifyToken, deleteNote);

export default NoteRouter;
