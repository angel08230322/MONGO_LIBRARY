const Member = require('/Users/Admin/Documents/back_end_LIBRARY/models/member');

const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// @desc    Get all members
// @route   GET /api/members
exports.getAllMembers = asyncHandler(async (req, res, next) => {
    const members = await Member.find().sort({ joinedAt: -1 });
    res.status(200).json({ success: true, count: members.length, data: members });
});

// @desc    Create new member
// @route   POST /api/members
exports.createMember = asyncHandler(async (req, res, next) => {
    const member = await Member.create(req.body);
    res.status(201).json({ success: true, data: member });
});

// @desc    Update a member
// @route   PUT /api/members/:id
exports.updateMember = asyncHandler(async (req, res, next) => {
    let member = await Member.findById(req.params.id);

    if (!member) {
        return res.status(404).json({ success: false, error: 'Member not found' });
    }

    member = await Member.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({ success: true, data: member });
});

// @desc    Delete a member
// @route   DELETE /api/members/:id
exports.deleteMember = asyncHandler(async (req, res, next) => {
    const member = await Member.findById(req.params.id);

    if (!member) {
        return res.status(404).json({ success: false, error: 'Member not found' });
    }

    // TODO: Add check here to ensure the member has no active loans before deletion.

    await member.deleteOne();
    res.status(200).json({ success: true, data: {} });
});