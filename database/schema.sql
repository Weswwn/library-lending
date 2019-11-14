-- DROP DATABASE IF EXISTS library;

-- CREATE DATABASE IF NOT EXISTS library;

-- USE library;
\c library

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  membershipNumber SERIAL PRIMARY KEY,
  username varchar(30) NOT NULL UNIQUE
);

DROP TABLE IF EXISTS books CASCADE;

CREATE TABLE books (
  bookID SERIAL PRIMARY KEY,
  bookTitle varchar(30) NOT NULL,
  bookStatus BOOLEAN
);

DROP TABLE IF EXISTS borrowed CASCADE;

CREATE TABLE IF NOT EXISTS borrowed (
  username varchar(30) NOT NULL,
  membershipNumber int NOT NULL,
  dateRented date NOT NULL,
  durationOfRental int NOT NULL,
  returnDate date NOT NULL
);

-- ALTER TABLE borrowed ADD CONSTRAINT username FOREIGN KEY (username) 
--   REFERENCES users(username) ON DELETE CASCADE;

-- ALTER TABLE borrowed ADD CONSTRAINT membershipNumber FOREIGN KEY (membershipNumber) 
--   REFERENCES users(membershipNumber) ON DELETE CASCADE;

-- ALTER TABLE borrowed ADD CONSTRAINT bookID FOREIGN KEY (bookID) 
--   REFERENCES books(bookID) ON DELETE CASCADE;
