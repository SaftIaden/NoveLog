import data from './data.json' assert { type: 'json' };
let books = data;

const getBooks = () => {
  return books;
};

const getBook = (id) => books.find((el) => el.id === id);

// const delImmos = () => (immos = []);
// const delImmo = (id) => {
//   const immo = immos.find((el) => el.id === id);
//   if (!immo) return false;
//   immos = immos.filter((el) => el.id !== id);
//   return true;
// };

const addBook = (newBook) => {
  const maxId = Math.max(...books.map(({ id }) => id));
  newBook.id = maxId + 1;
  books.push(newBook);
  return newBook;
};

const updBook = (id, obj) => {
  const book = books.find((el) => el.id === id);
  if (!book) return false;
  for (const [key, val] of Object.entries(obj)) book[key] = val;
  return true;
};

export { getBooks, getBook, addBook, updBook };
