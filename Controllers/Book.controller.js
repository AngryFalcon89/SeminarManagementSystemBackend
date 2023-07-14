import Book from '../Models/Book.model.js'
import createError from 'http-errors';

export const getAllBooks = async (req, res, next) => {
  console.log(req.body);
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalBooks = await Book.countDocuments();
    const totalPages = Math.ceil(totalBooks / limit);

    const books = await Book.find()
      .skip(skip)
      .limit(limit);

    res.send({
      books,
      currentPage: page,
      totalPages
    });
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

export const search = async (req, res, next) => {
  console.log(req.headers, req.query);
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const author = req.headers['author'] || req.query['author'];
    const title = req.headers['title'] || req.query['title'];
    const publisher = req.headers['publisher'] || req.query['publisher'];
    const queryObject = { $or: [] };

    if (author) {
      queryObject.$or.push({ AUTHOR: { $regex: author, $options: "i" } });
    }
    if (publisher) {
      queryObject.$or.push({ Publisher: { $regex: publisher, $options: "i" } });
    }
    if (title) {
      queryObject.$or.push({ TITLE: { $regex: title, $options: "i" } });
    }

    const totalBooks = await Book.countDocuments(queryObject);
    const totalPages = Math.ceil(totalBooks / limit);

    const books = await Book.find(queryObject)
      .skip(skip)
      .limit(limit);

    res.send({
      books,
      currentPage: page,
      totalPages
    });
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

//bhayye tu bhi body me pass kariyo details aur header me id dekhle
export const updateBook = async (req, res, next) => {
    try {
      const { bookid } = req.headers;
      const updates = req.body;
      console.log(bookid)
  
      const updatedBook = await Book.findByIdAndUpdate(bookid, updates, { new: true });
  
      if (!updatedBook) {
        throw createError.NotFound('Book not found');
      }
  
      res.send(updatedBook);
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
};

//bhayye body me pass kariyo book ki details dekhle
export const addBook = async (req, res, next) => {
  console.log(req.body);
    try {
      console.log("inside add book function")
      const newBook = req.body;
  
      const createdBook = await Book.create(newBook);
  
      res.status(201).send(createdBook);
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
};

//bhayye header me pass kariyo bookid dekhle 
export const deleteBook = async (req, res, next) => {
    try {
      const { bookid } = req.headers;
      
      const deletedBook = await Book.findByIdAndRemove(bookid);
  
      if (!deletedBook) {
        throw createError.NotFound('Book not found');
      }
  
      res.send(deletedBook);
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
};