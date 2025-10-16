const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
    memberId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Member', // Reference to the Member model
        required: true
    },
    bookId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Book', // Reference to the Book model
        required: true
    },
    loanedAt: {
        type: Date,
        default: Date.now
    },
    dueAt: {
        type: Date,
        required: true,
        // Custom validation to ensure dueAt is in the future
    },
    returnedAt: {
        type: Date,
        default: null // Null if not yet returned
    }
});

module.exports = mongoose.model('Loan', LoanSchema);