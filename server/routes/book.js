import express from 'express';
import { getBook, getBooks, addBook, updBook } from '../model/books.js';
const router = express.Router();

router.get('/', (req, res) => res.status(200).json(getBooks(req)));
router.get('/books/:id', (req, res) => {
  const { id } = req.params;
  const book = getBook(Number(id));
  if (book) return res.status(200).json(book);
  return res.status(404).send('The requested resource was not found');
});

// router.delete('/immos', (req, res) => res.status(200).send(delImmos()));
// router.delete('/immos/:id', (req, res) => {
//   const { id } = req.params;
//   if (delImmo(Number(id))) return res.status(200).send('deleted');
//   return res.status(404).send('The requested resource was not found');
// });

router.post('/', (req, res) => res.status(201).json(addBook(req.body)));

router.patch('/books/:id', (req, res) => {
  if (updBook(Number(req.params.id), req.body)) return res.status(200).send('changed');
  return res.status(404).send('The requested resource was not found');
});

export default router;
