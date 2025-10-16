const Book = require('/Users/Admin/Documents/back_end_LIBRARY/models/book');

// Error handling helper
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// @desc    Get all books
// @route   GET /api/books
exports.getAllBooks = asyncHandler(async (req, res, next) => {
    const books = await Book.find().sort({ title: 1 });
    res.status(200).json({ success: true, count: books.length, data: books });
});

// @desc    Create new book
// @route   POST /api/books
exports.createBook = asyncHandler(async (req, res, next) => {
    const book = await Book.create(req.body);
    res.status(201).json({ success: true, data: book });
});

// @desc    Update a book
// @route   PUT /api/books/:id
exports.updateBook = asyncHandler(async (req, res, next) => {
    let book = await Book.findById(req.params.id);

    if (!book) {
        return res.status(404).json({ success: false, error: 'Book not found' });
    }

    book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({ success: true, data: book });
});

// @desc    Delete a book
// @route   DELETE /api/books/:id
exports.deleteBook = asyncHandler(async (req, res, next) => {
    const book = await Book.findById(req.params.id);

    if (!book) {
        return res.status(404).json({ success: false, error: 'Book not found' });
    }

    // TODO: Add check here to ensure there are no active loans for this book before deletion.

    await book.deleteOne(); // Use deleteOne() in Mongoose 6+

    res.status(200).json({ success: true, data: {} });
});