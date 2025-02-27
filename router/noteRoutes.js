import express from 'express';
import { getNotes, createNote, updateNote, deleteNote } from '../controller/noteController.js';

const router = express.Router();

router.get('/notes', getNotes);
router.post('/note', createNote);
router.patch('/note/:id', updateNote);
router.delete('/note/:id', deleteNote);

export default router;