import { query } from '../db/index.js';

const dbGetBooks = async () => {
  const { rows } = await query('select * from books');
  return rows;
};

const dbGetBook = async (id) => {
  const { rows } = await query('select * from books where id = $1', [id]);
  return rows[0];
};

const dbPatchBook = async (rating, genre, currentpage, read, id) => {
  const { rows } = await query('update books set rating = $1, genre = $2, currentpage = $3, read = $4 where id = $5 returning * ', [rating, genre, currentpage, read, id]);
  return rows[0];
};

const dbPostBook = async (image, title, author, read, genre, pages, rating, description) => {
  const { rows } = await query('INSERT INTO books (image, title, author, read, genre, currentpage, pages, rating, description) VALUES ($1, $2, $3, $4, $5, default, $6 , $7, $8); returning *', [image, title, author, read, genre, pages, rating, description]);
  return rows[0];
};

export { dbGetBooks, dbGetBook, dbPostBook, dbPatchBook };
