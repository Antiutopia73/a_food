import express from 'express';
import { addComment, getComments } from '../controller/comment.js';

const router = express.Router();

router.post('/create', addComment); // Добавить комментарий
router.get('/receive', getComments); // Получить все комментарии


export default router;