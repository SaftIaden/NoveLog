import { dbGetBooks, dbGetBook, dbPatchBook, dbPostBook, dbDeleteBook } from '../models/books.js';

const getBooks = async (req, res) => {
  const books = await dbGetBooks();
  res.status(200).json(books);
};

const getBook = async (req, res) => {
  const { id } = req.params;
  const book = await dbGetBook(id);
  res.status(200).json(book);
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  const book = await dbDeleteBook(id);
  res.status(200).json(book);
};

const patchBook = async (req, res) => {
  const { id } = req.params;
  const { rating, genre, currentpage, read } = req.body;
  const book = await dbGetBook(id);
  if (!book) res.status(404).send('Book not found!');
  const patchedBook = await dbPatchBook(rating, genre, currentpage, read, id);
  res.status(200).json(patchedBook);
};

const postBook = async (req, res) => {
  const { image, title, author, read, genre, pages, rating, description } = req.body;
  const book = await dbPostBook(image, title, author, read, genre, pages, rating, description);
  return res.status(200).json(book);
};

export { getBooks, getBook, patchBook, postBook, deleteBook };
