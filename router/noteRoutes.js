import express from 'express';
import { getNotes, createNote, updateNote, deleteNote } from '../controller/noteController.js';

const NoteRouter = express.Router();

NoteRouter.get('/notes', getNotes);
NoteRouter.post('/note', createNote);
NoteRouter.patch('/note/:id', updateNote);
NoteRouter.delete('/note/:id', deleteNote);

export default NoteRouter;