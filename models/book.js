const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    isbn: {
        type: String,
        required: [true, 'ISBN is required'],
        unique: true,
        trim: true,
        // Validation for ISBN format can be added here
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
        trim: true
    },
    copies: {
        type: Number,
        required: [true, 'Number of copies is required'],
        default: 1,
        min: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Book', BookSchema);