CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  image TEXT NOT NULL,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  finished BOOLEAN NOT NULL,
  genre TEXT NOT NULL,
  currentpage INTEGER NOT NULL,
  pages INTEGER NOT NULL,
  description TEXT NOT NULL
);


INSERT INTO books (image, title, author, finished, genre, currentpage, pages, description)
VALUES
  ('https://example.com/book-cover-1.jpg', '1984', 'George Orwell', true, 'Science Fiction', 0, 328, '1984 is a dystopian novel by George Orwell that explores themes of government surveillance, censorship, and totalitarianism.'),
  ('https://example.com/book-cover-2.jpg', 'The Catcher in the Rye', 'J.D. Salinger', true, 'Fiction', 0, 277, 'The Catcher in the Rye is a novel by J.D. Salinger that follows the story of teenage protagonist Holden Caulfield as he grapples with the complexities of adolescence and the adult world.'),
  ('https://example.com/book-cover-3.jpg', 'To Kill a Mockingbird', 'Harper Lee', true, 'Fiction', 0, 281, 'To Kill a Mockingbird is a novel by Harper Lee that takes place in the 1930s and follows the story of a young girl named Scout as she learns about racism and injustice in her small town in Alabama.'),
  ('https://example.com/book-cover-4.jpg', 'The Hobbit', 'J.R.R. Tolkien', true, 'Fantasy', 0, 310, 'The Hobbit is a fantasy novel by J.R.R. Tolkien that follows hobbit Bilbo Baggins as he embarks on a quest to reclaim treasure stolen by the dragon Smaug.'),
  ('https://example.com/book-cover-5.jpg', 'Harry Potter and the Philosophers Stone', 'J.K. Rowling', false, 'Fantasy', 150, 223, 'Harry Potter and the Philosophers Stone is a fantasy novel by J.K. Rowling that follows the story of young wizard Harry Potter as he discovers his magical heritage and attends Hogwarts School of Witchcraft and Wizardry.'),
  ('https://example.com/book-cover-6.jpg', 'The Girl with the Dragon Tattoo', 'Stieg Larsson', true, 'Thriller', 528, 672, 'The Girl with the Dragon Tattoo is a thriller novel by Stieg Larsson that follows journalist Mikael Blomkvist and hacker Lisbeth Salander as they investigate the disappearance of a wealthy businessmans niece.'),
  ('https://example.com/book-cover-7.jpg', 'The Great Gatsby', 'F. Scott Fitzgerald', true, 'Fiction', 0, 180, 'The Great Gatsby is a novel by F. Scott Fitzgerald that takes place in the 1920s and follows the lives of wealthy socialites in New York.'),
  ('https://example.com/book-cover-8.jpg', 'Pride and Prejudice', 'Jane Austen', false, 'Romance', 100, 432, 'Pride and Prejudice is a novel by Jane Austen that follows the lives of the Bennet family as they navigate relationships and societal expectations in early 19th-century England.'), 
('https://example.com/book-cover-9.jpg', 'The Lord of the Rings', 'J.R.R. Tolkien', false, 'Fantasy', 300, 1178, 'The Lord of the Rings is a trilogy of fantasy novels by J.R.R. Tolkien that follow hobbit Frodo Baggins as he journeys to destroy the One Ring and defeat the evil Sauron.'),
('https://example.com/book-cover-10.jpg', 'The Hunger Games', 'Suzanne Collins', true, 'Science Fiction', 0, 374, 'The Hunger Games is a science fiction novel by Suzanne Collins that takes place in a dystopian society where children are forced to fight to the death in a televised event.'),
('https://example.com/book-cover-11.jpg', 'The Adventures of Sherlock Holmes', 'Arthur Conan Doyle', true, 'Mystery', 0, 307, 'The Adventures of Sherlock Holmes is a collection of short stories by Arthur Conan Doyle that follow the investigations of detective Sherlock Holmes and his friend Dr. John Watson.'),
('https://example.com/book-cover-12.jpg', 'Wuthering Heights', 'Emily Bronte', false, 'Romance', 50, 416, 'Wuthering Heights is a novel by Emily Bronte that explores themes of love, revenge, and class struggle on the moors of England.'),
('https://example.com/book-cover-13.jpg', 'The Picture of Dorian Gray', 'Oscar Wilde', true, 'Fiction', 0, 304, 'The Picture of Dorian Gray is a novel by Oscar Wilde that tells the story of a young man who sells his soul to preserve his youth and beauty.'),
('https://example.com/book-cover-14.jpg', 'Brave New World', 'Aldous Huxley', true, 'Science Fiction', 0, 288, 'Brave New World is a dystopian novel by Aldous Huxley that explores themes of social control, eugenics, and the dangers of scientific progress.'),
('https://example.com/book-cover-15.jpg', 'The Road', 'Cormac McCarthy', true, 'Fiction', 0, 307, 'The Road is a novel by Cormac McCarthy that takes place in a post-apocalyptic world and follows the story of a father and son as they journey south to avoid the harsh winter.'),
('https://example.com/book-cover-16.jpg', 'Animal Farm', 'George Orwell', true, 'Fiction', 0, 141, 'Animal Farm is a novella by George Orwell that tells the story of a group of farm animals who rebel against their human farmer and establish their own society, but eventually fall victim to corruption and tyranny.'),
('https://example.com/book-cover-17.jpg', 'The Martian', 'Andy Weir', true, 'Science Fiction', 0, 369, 'The Martian is a science fiction novel by Andy Weir that tells the story of astronaut Mark Watney, who is stranded on Mars and must use his skills and ingenuity to survive.'),
('https://example.com/book-cover-18.jpg', 'Gone Girl', 'Gillian Flynn', true, 'Mystery', 0, 415, 'Gone Girl is a mystery novel by Gillian Flynn that follows the investigation into the disappearance of a woman on her fifth wedding anniversary, and the revelation of dark secrets about her marriage and past.');