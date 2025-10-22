const express = require('express');
const router = express.Router();
const { getAllMembers, getMemberById, createMember, deleteMember } = require('../controllers/member.js');

// Define routes with proper handler functions
router.get('/', getAllMembers);
router.get('/:id', getMemberById);
router.post('/', createMember);
router.delete('/:id', deleteMember);

module.exports = router;