const express = require("express");
const { body, validationResult } = require("express-validator");
const Group = require("../models/Group");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

// @route   GET /api/groups
// @desc    Get all groups (with filters and pagination)
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {};

    // Filter by search term
    if (req.query.search) {
      filter.$text = { $search: req.query.search };
    }

    // Filter by privacy
    if (req.query.private !== undefined) {
      filter.isPrivate = req.query.private === "true";
    }

    const groups = await Group.find(filter)
      .populate("creator", "name email")
      .populate("members.user", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Group.countDocuments(filter);

    res.json({
      success: true,
      count: groups.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      groups,
    });
  } catch (error) {
    console.error("Get groups error:", error);
    res.status(500).json({
      success: false,
      message: "Server error getting groups",
    });
  }
});

// @route   POST /api/groups
// @desc    Create a new group
// @access  Private
router.post(
  "/",
  [
    auth,
    body("name")
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage("Group name must be between 2 and 100 characters"),
    body("description")
      .optional()
      .isLength({ max: 500 })
      .withMessage("Description cannot be more than 500 characters"),
    body("maxMembers")
      .optional()
      .isInt({ min: 1, max: 500 })
      .withMessage("Max members must be between 1 and 500"),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      const { name, description, isPrivate, tags, maxMembers } = req.body;

      // Create group
      const group = new Group({
        name,
        description,
        creator: req.user.id,
        isPrivate: isPrivate || false,
        tags: tags || [],
        maxMembers: maxMembers || 50,
        members: [
          {
            user: req.user.id,
            role: "admin",
          },
        ],
      });

      await group.save();

      // Add group to user's groups array
      await User.findByIdAndUpdate(req.user.id, {
        $push: { groups: group._id },
      });

      // Populate the group for response
      await group.populate("creator", "name email");
      await group.populate("members.user", "name email");

      res.status(201).json({
        success: true,
        message: "Group created successfully",
        group,
      });
    } catch (error) {
      console.error("Create group error:", error);
      res.status(500).json({
        success: false,
        message: "Server error creating group",
      });
    }
  }
);

// @route   GET /api/groups/:id
// @desc    Get group by ID
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id)
      .populate("creator", "name email")
      .populate("members.user", "name email avatar");

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    // Check if user has access to private group
    if (group.isPrivate && !group.isMember(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: "Access denied to private group",
      });
    }

    res.json({
      success: true,
      group,
    });
  } catch (error) {
    console.error("Get group error:", error);
    res.status(500).json({
      success: false,
      message: "Server error getting group",
    });
  }
});

// @route   POST /api/groups/:id/join
// @desc    Join a group
// @access  Private
router.post("/:id/join", auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    // Check if already a member
    if (group.isMember(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: "You are already a member of this group",
      });
    }

    // Check if group is full
    if (group.members.length >= group.maxMembers) {
      return res.status(400).json({
        success: false,
        message: "Group is full",
      });
    }

    // Add user to group
    group.members.push({
      user: req.user.id,
      role: "member",
    });

    await group.save();

    // Add group to user's groups array
    await User.findByIdAndUpdate(req.user.id, {
      $push: { groups: group._id },
    });

    res.json({
      success: true,
      message: "Successfully joined the group",
    });
  } catch (error) {
    console.error("Join group error:", error);
    res.status(500).json({
      success: false,
      message: "Server error joining group",
    });
  }
});

// @route   POST /api/groups/:id/leave
// @desc    Leave a group
// @access  Private
router.post("/:id/leave", auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    // Check if user is a member
    if (!group.isMember(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: "You are not a member of this group",
      });
    }

    // Don't allow creator to leave unless they transfer ownership
    if (group.creator.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "Group creator cannot leave. Transfer ownership first.",
      });
    }

    // Remove user from group
    group.members = group.members.filter(
      (member) => member.user.toString() !== req.user.id
    );

    await group.save();

    // Remove group from user's groups array
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { groups: group._id },
    });

    res.json({
      success: true,
      message: "Successfully left the group",
    });
  } catch (error) {
    console.error("Leave group error:", error);
    res.status(500).json({
      success: false,
      message: "Server error leaving group",
    });
  }
});

module.exports = router;
