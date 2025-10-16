const Loan = require('/Users/Admin/Documents/back_end_LIBRARY/models/loan');
const Book = require('/Users/Admin/Documents/back_end_LIBRARY/models/book');
const Member = require('/Users/Admin/Documents/back_end_LIBRARY/models/member');


// Helper to calculate due date (e.g., 7 days from now)
const calculateDueDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7); // Loan period set to 7 days
    return date;
};

// @desc    Get all loans
// @route   GET /api/loans
// @access  Public
exports.getLoans = async (req, res) => {
    try {
        // Find all loans and populate the book and member details (joins data)
        const loans = await Loan.find()
            .populate('bookId', 'title author isbn')
            .populate('memberId', 'name email');

        res.status(200).json({ success: true, count: loans.length, data: loans });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error fetching loans.' });
    }
};

// @desc    Get single loan by ID
// @route   GET /api/loans/:id
// @access  Public
exports.getLoanById = async (req, res) => {
    try {
        const loan = await Loan.findById(req.params.id)
            .populate('bookId', 'title author isbn')
            .populate('memberId', 'name email');

        if (!loan) {
            return res.status(404).json({ success: false, error: 'Loan not found' });
        }

        res.status(200).json({ success: true, data: loan });
    } catch (error) {
        console.error(error);
        if (error.name === 'CastError') {
            return res.status(400).json({ success: false, error: 'Invalid Loan ID format.' });
        }
        res.status(500).json({ success: false, error: 'Server Error fetching loan.' });
    }
};

// @desc    Create a new loan (Checkout a book)
// @route   POST /api/loans
// @access  Public
exports.createLoan = async (req, res) => {
    const { memberId, bookId } = req.body;

    if (!memberId || !bookId) {
        return res.status(400).json({ success: false, error: 'Please provide both memberId and bookId' });
    }

    try {
        // 2. Check if the book exists and has copies available
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ success: false, error: 'Book not found' });
        }

        if (book.copies <= 0) {
            return res.status(400).json({ success: false, error: `No copies of "${book.title}" available for loan.` });
        }

        // 3. Check if the member exists
        const member = await Member.findById(memberId);
        if (!member) {
            return res.status(404).json({ success: false, error: 'Member not found' });
        }

        // 4. Create the new loan record
        const dueAt = calculateDueDate();
        const loan = await Loan.create({
            memberId,
            bookId,
            dueAt,
        });

        // 5. Update the book's available copies
        book.copies -= 1;
        await book.save();

        res.status(201).json({
            success: true,
            data: loan,
            message: `Book "${book.title}" checked out successfully to ${member.name}. Due date: ${dueAt.toDateString()}`
        });

    } catch (error) {
        console.error(error);
        // Handle Mongoose cast errors (e.g., invalid ObjectId format)
        if (error.name === 'CastError') {
            return res.status(400).json({ success: false, error: 'Invalid Book or Member ID format.' });
        }
        res.status(500).json({ success: false, error: 'Server Error during loan creation.' });
    }
};

// @desc    Return a book (Placeholder implementation)
// @route   PUT /api/loans/:id/return
// @access  Public
exports.returnBook = async (req, res) => {
    // This function would be fully implemented to set returnedAt date and increment book copies
    res.status(501).json({ success: false, message: 'Return book functionality not yet implemented.' });
};
