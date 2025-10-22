const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  loanDate: { type: Date, default: Date.now },
  returnDate: { type: Date }
});

module.exports = mongoose.model('Loan', loanSchema);