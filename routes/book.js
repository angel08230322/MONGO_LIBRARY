const express = require('express');
const {
    getAllBooks,
    createBook,
    updateBook,
    deleteBook,
} = require('/Users/Admin/Documents/back_end_LIBRARY/controllers/book');

const router = express.Router();

// Routes for base path /api/books
router.route('/')
    .get(getAllBooks)
    .post(createBook);

// Routes for specific book ID /api/books/:id
router.route('/:id')
    .put(updateBook)
    .delete(deleteBook);

module.exports = router;