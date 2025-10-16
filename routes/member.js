const express = require('express');
const {
    getAllMembers,
    createMember,
    updateMember,
    deleteMember,
} = require('/Users/Admin/Documents/back_end_LIBRARY/controllers/member');

const router = express.Router();

// Routes for base path /api/members
router.route('/')
    .get(getAllMembers)
    .post(createMember);

// Routes for specific member ID /api/members/:id
router.route('/:id')
    .put(updateMember)
    .delete(deleteMember);

module.exports = router;