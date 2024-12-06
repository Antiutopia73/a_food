import express from 'express';
import { addComment, getComments } from '../controller/comment.js';

const router = express.Router();

router.post('/create', addComment);
router.get('/receive', getComments);


export default router;
