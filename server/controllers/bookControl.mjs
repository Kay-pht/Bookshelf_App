import { validationResult } from "express-validator";
import Book from "../models/book.mjs";

async function getAllBooks(req, res) {
  const id = req.params.id;
  const books = await Book.find();
  res.json(books);
}

async function getBookById(req, res) {
  const id = req.params.id;
  const book = await Book.findById(id);
  if (!book) res.status(404).json({ msg: "Book not found" });
  res.json(book);
}

async function registerBook(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errs = errors.array();
    return res.status(400).json(errs);
  }
  const book = new Book(req.body);
  const newBook = await book.save();
  res.status(201).json(newBook);
}

async function updateBook(req, res) {
  debugger;
  const { title, description, comment, rating } = req.body;
  const id = req.params.id;
  const targetBook = await Book.findById(id);
  if (!targetBook) return res.status(404).json({ msg: "Book not found" });
  if (title) targetBook.title = title;
  if (description) targetBook.description = description;
  if (comment) targetBook.comment = comment;
  if (rating) targetBook.rating = rating;
  await targetBook.save();

  res.json(targetBook);
}

async function deleteBook(req, res) {
  const id = req.params.id;
  const { deletedCount } = await Book.deleteOne({ _id: id });

  if (deletedCount === 0)
    return res.status(404).json({ msg: "Book not found" });
  res.json({ msg: "Deleted Successfully" });
}

export { registerBook, updateBook, getAllBooks, getBookById, deleteBook };
