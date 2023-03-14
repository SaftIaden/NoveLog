import express from 'express';
import asyncHandler from 'express-async-handler';
import { query } from '../../db/index.js';
import { getBook, getBooks, postBook, patchBook, deleteBook } from '../../controller/books.js';
const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { rows } = await query("SELECT 'It works' as test");
    res.status(200).json(rows);
  }),
);
router.get('/books', asyncHandler(getBooks));
router.get('/books/:id', asyncHandler(getBook));

router.delete('/books/:id', asyncHandler(deleteBook));

router.post('/books', asyncHandler(postBook));

router.patch('/books/:id', asyncHandler(patchBook));

export default router;
