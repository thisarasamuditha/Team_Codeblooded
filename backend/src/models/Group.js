const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a group name"],
      trim: true,
      maxlength: [100, "Group name cannot be more than 100 characters"],
    },
    description: {
      type: String,
      maxlength: [500, "Description cannot be more than 500 characters"],
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        role: {
          type: String,
          enum: ["admin", "member"],
          default: "member",
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    isPrivate: {
      type: Boolean,
      default: false,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    maxMembers: {
      type: Number,
      default: 50,
      min: [1, "Group must allow at least 1 member"],
      max: [500, "Group cannot have more than 500 members"],
    },
  },
  {
    timestamps: true,
  }
);

// Index for better search performance
groupSchema.index({ name: "text", description: "text", tags: "text" });
groupSchema.index({ creator: 1 });
groupSchema.index({ "members.user": 1 });

// Virtual for member count
groupSchema.virtual("memberCount").get(function () {
  return this.members.length;
});

// Method to check if user is member
groupSchema.methods.isMember = function (userId) {
  return this.members.some(
    (member) => member.user.toString() === userId.toString()
  );
};

// Method to check if user is admin
groupSchema.methods.isAdmin = function (userId) {
  return this.members.some(
    (member) =>
      member.user.toString() === userId.toString() && member.role === "admin"
  );
};

module.exports = mongoose.model("Group", groupSchema);
