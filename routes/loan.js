// Routes/loanRoutes.js
const express = require('express');
const router = express.Router();

// Destructure the functions exported from the controller
const {
    getLoans,
    getLoanById,
    createLoan,
    returnBook
} = require('/Users/Admin/Documents/back_end_LIBRARY/controllers/loan');

// --- Routes handling the collection (/api/loans) ---
router.route('/')
    .get(getLoans)    // GET /api/loans (Fetch all loans)
    .post(createLoan); // POST /api/loans (Create a new loan/Checkout)

// --- Routes handling specific resources (/api/loans/:id) ---
router.route('/:id')
    .get(getLoanById); // GET /api/loans/:id (Fetch a single loan)
    // Note: PUT/DELETE for general loan management (like updating due date or deleting a record) would go here

// --- Dedicated return route (/api/loans/:id/return) ---
router.route('/:id/return')
    .put(returnBook); // PUT /api/loans/:id/return (Marks the loan as returned)

module.exports = router;
